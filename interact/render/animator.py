# animator.py

"""
    pygame toy model snippet v2 - trail
    notes:
        this is an implementation of the strange attractor in python.
        using pygame to draw it.
        control:
        press i to increase the scale
        press d to decrease the scale
        press r to reset scale
        press c to clear the screen once
        press u to continuesly clear the screen.
        press x to change color randomly 
"""

import sys

try:
	import pygame
except  ModuleNotFoundError:
	print("it seems you don't have pygame. try:")
	print("pip3 install pygame --user")
	sys.exit(1)

import sys
import time
import random

from utils.point import Point
from utils.translate import Translate_butterfly


""" this function reads data from the NFT and passes 
	it to the integrator
"""

def draw_pixel(surface, color, point):
    # unpack 2 cordinates of the point (x, y) into the rect x, y
    pygame.draw.rect(surface, color, (*point[0:2:1], 1, 1), 1)


if __name__ == "__main__":
    pygame.init()
    surface = pygame.display.set_mode((800, 600))

    # color definitions
    red = (0xff, 0, 0)
    green = (0, 0xff, 0)
    blue = (0, 0, 0xff)
    white = (0xff, 0xff, 0xff)
    black = (0, 0, 0)
    
    (p, sigma, rho, beta) = Translate_butterfly("0xbadcacca")

    # timeing variables.
    current = time.time()
    previous = 1.0
    interval = 1 / 30.
    dt = 0.0001
    scale = 5
    
    # state and program variables
    should_clear = False
    clear_once = False
    change_color = False
    bgcolor = black
    attrcolor = green
    # main program loop
    # all the processing amd
    # all the screen updating happens here.
    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            elif event.type == pygame.KEYUP:
                if event.key == pygame.K_c:
                    clear_once = True
                elif event.key == pygame.K_u:
                    should_clear = not should_clear
                elif event.key == pygame.K_i:
                    scale *= 1.2
                    clear_once = True
                elif event.key == pygame.K_d:
                    scale /= 1.2
                    clear_once = True
                elif event.key == pygame.K_r:
                    scale = 5
                    clear_once = True
                elif event.key == pygame.K_x:
                    change_color = True
        # apply the transformation
        dx = (sigma * (p.y - p.x)) * dt
        dy = (p.x * (rho - p.z) - p.y) * dt
        dz = (p.x * p.y - beta * p.z) * dt
        p.x = p.x + dx
        p.y = p.y + dy
        p.z = p.z + dz

        # make a new point translated over to the center of the screen.
        # and also scale a bit.
        cp = Point(p.x * scale + 400, p.y * scale + 300, p.z * scale)

        # draw the pixel that is on the attractor.
        draw_pixel(surface, attrcolor, cp)

        # only update the screen 30 times a second.
        # such a performance hit to update every single itteration of the loop. 
        current = time.time()
        if (current - previous) >= interval:
            previous = current
            pygame.display.update()

            # only clear when it is allowed.
            # and also do it here so not to hava a to big performance hit.
            if should_clear:
                surface.fill(bgcolor)
            elif clear_once:
                clear_once = False
                surface.fill(bgcolor)
            elif change_color:
                change_color = False
                attrcolor = (random.randint(0,256), random.randint(0,256), random.randint(0,256))
                print(attrcolor)

from operator import add, sub, mul, truediv

# a simple python vector snippet
class Point(list):
    def __init__(self, *args, **kwargs):
        self.attrs = ["x", "y", "z"]
        if len(args):
            super(Point, self).__init__(args)
        else:
            self.append(kwargs.get("x", 0))
            self.append(kwargs.get("y", 0))
            self.append(kwargs.get("z", 0))

    @property
    def x(self):
        return self[0]

    @x.setter
    def x(self, value):
        self[0] = value

    @property
    def y(self):
        return self[1]

    @y.setter
    def y(self, value):
        self[1] = value

    @property
    def z(self):
        return self[2]

    @z.setter
    def z(self, value):
        self[2] = value

    def __add__(self, other):
        return Point([add(*value) for value in zip(self, other)])

    def __sub__(self, other):
        return Point([sub(*value) for value in zip(self, other)])

    def __mul__(self, other):
        return Point([mul(*value) for value in zip(self, other)])

    def __truediv__(self, other):
        return Point([truediv(*value) for value in zip(self, other)])

    def __repr__(self):
        return ("Point(%s)" % super(Point, self).__repr__())

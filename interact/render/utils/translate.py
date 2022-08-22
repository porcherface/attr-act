from .point import Point


def Translate_butterfly(data):
    #data will be something like "lorenz-px-py-pz-sigma-rho-beta"
    # for the sake of simplicity for now we just "pass :)"
    sigma = 10.
    rho = 28.
    beta = 8/ 3.
    p = Point(0.1, 0.42, 0.90)

    return (p,sigma,rho, beta)

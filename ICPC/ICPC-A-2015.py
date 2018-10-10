############################################################
#ICPC 2015 Problem A - Amalgamated Artichokes
#https://icpc.baylor.edu/worldfinals/problems/icpc2015.pdf
#
#Display the maximum decline in the stock prices
############################################################

import math

def problemA(p, a, b, c, d, k):
    fMax = 0
    fDiff = 0
    for i in range(1,k+1):
        fActual = p*(math.sin(a*i + b) + (math.cos(c*i+ d) + 2))
        if fMax < fActual: fMax = fActual
        if fMax-fActual > fDiff: fDiff = fMax - fActual
    print('Max diff = ', fDiff)

problemA(100, 432, 406, 867, 60, 1000)

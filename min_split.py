# -*- coding: utf-8 -*-
"""
Created on Thu Jun 17 22:27:37 2021

@author: roy82
"""

import numpy as np
import argparse 

parser = argparse.ArgumentParser()
parser.add_argument("money_array" , help = "array needed to split")
parser.add_argument("name_array" , help = "array of names")

args = parser.parse_args()

moneys = (args.money_array).split(",")
moneys = np.array([float(m) for m in moneys if m != "" ])

name = (args.name_array).split(",")
name = np.array([n for n in name if n != "" ])

print(moneys)
print(name)

# moneys = np.array([-100,63,28,-45,234,-132,-48])
# moneys = np.array([8 , -4,-5,7,-6,10,-1 ,-11,7,4,-5,3,8,-15,11,7,-9 ,-9 ])
# moneys = np.array([8 , -4,-5,7,-6,3,-3 ])
# name = np.arange(len(moneys))

pos = moneys[moneys>=0]
pos_name = name[moneys>=0]
neg= moneys[moneys<0]
neg_name = name[moneys<0]

while True:
    pos_name = pos_name[pos != 0]
    pos = pos[pos != 0]
    neg_name =neg_name[neg != 0]
    neg = neg[neg != 0]

    
    money_table = np.zeros((len(pos),len(neg)))
    for c , p in enumerate(pos):
        money_table[c , :] = p+neg
        
    if len(neg) == 1 or len(pos) ==1 :
        for p, p_n in zip(pos , pos_name):
            for n , n_n in zip(neg , neg_name):
                given_m = min(abs(p) , abs(n))
                print(str(n_n) + " -> " + str(p_n) + " : " + str(given_m))
        break
    
    money_table = np.abs(money_table)
    
    y , x = np.where(money_table == np.min(money_table))
    xy = [[m,n] for m,n in zip(x,y)]

    cal_x = []
    cal_y = []
    for x,y in xy:
        if x in cal_x or y in cal_y:
            pass
        else : 
            cal_x.append(x)
            cal_y.append(y)
            given_m = min(abs(pos[y]) , abs(neg[x]))
            print(str(neg_name[x]) + " -> " + str(pos_name[y]) + " : " + str(given_m))
        
            pos[y] -= given_m
            neg[x] += given_m
    


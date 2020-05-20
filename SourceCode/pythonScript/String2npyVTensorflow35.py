#!/usr/bin/env python
# coding: utf-8

# In[1]:


#Author: Wong Yuk Ming Edward
#Description Model loader for tensorflow model
#Conversion of data from sequence of strings numpy array and pass to the model
#collect prediction result and save as .npy for loading


# In[2]:


import tensorflow as tf
import numpy as np
from numpy import save
import json

txtFilePath='./Received/receivedString.txt'
ssModelPath='./model/tensorflow/ss/35/max'
angleModelPath='./model/tensorflow/angle/35/max'
savingPath='./SendingOut/receivedSequence.npy'
#
aminoAcidSequence=list()
fp=open(txtFilePath)
lines=fp.readlines()
for line in lines:
    for char in line:
        aminoAcidSequence.append(char.upper())

print(aminoAcidSequence)

#check error
print('complete without error')


# In[3]:


ssModel = tf.keras.models.load_model(ssModelPath)
angleModel = tf.keras.models.load_model(angleModelPath)

#check error
print('complete without error')


# In[4]:


#Creating object that usable in python from json string of amino acid properties
aap='{"A": {"hydrophobicity": 0.62,"hydrophilicity": -0.5,"hydrogenBond": 2,"volumeOfSideChains": 27.5,"polarity": 8.1,"polarizability": 0.046,"solventAccessibleSurfaceArea": 1.181,"netChargeIndexOfSideChains": 0.007187,"averageMass": 71.0788},"C": {"hydrophobicity": 0.29,"hydrophilicity": -1,"hydrogenBond": 2,"volumeOfSideChains": 44.6,"polarity": 5.5,"polarizability": 0.128,"solventAccessibleSurfaceArea": 1.461,"netChargeIndexOfSideChains": -0.03661,"averageMass": 103.1388},"D": {"hydrophobicity": -0.9,"hydrophilicity": 3,"hydrogenBond": 4,"volumeOfSideChains": 40,"polarity": 13,"polarizability": 0.105,"solventAccessibleSurfaceArea": 1.587,"netChargeIndexOfSideChains": -0.2382,"averageMass": 115.0886},"E": {"hydrophobicity": -0.74,"hydrophilicity": 3,"hydrogenBond": 4,"volumeOfSideChains": 62,"polarity": 12.3,"polarizability": 0.151,"solventAccessibleSurfaceArea": 1.862,"netChargeIndexOfSideChains": 0.006802,"averageMass": 129.1155},"F": {"hydrophobicity": 1.19,"hydrophilicity": -2.5,"hydrogenBond": 2,"volumeOfSideChains": 115.5,"polarity": 5.2,"polarizability": 0.29,"solventAccessibleSurfaceArea": 2.228,"netChargeIndexOfSideChains": 0.037552,"averageMass": 147.1766},"G": {"hydrophobicity": 0.48,"hydrophilicity": 0,"hydrogenBond": 2,"volumeOfSideChains": 0,"polarity": 9,"polarizability": 0,"solventAccessibleSurfaceArea": 0.881,"netChargeIndexOfSideChains": 0.179052,"averageMass": 57.0519},"H": {"hydrophobicity": -0.4,"hydrophilicity": -0.5,"hydrogenBond": 4,"volumeOfSideChains": 79,"polarity": 10.4,"polarizability": 0.23,"solventAccessibleSurfaceArea": 2.025,"netChargeIndexOfSideChains": -0.01069,"averageMass": 137.1411},"I": {"hydrophobicity": 1.38,"hydrophilicity": -1.8,"hydrogenBond": 2,"volumeOfSideChains": 93.5,"polarity": 5.2,"polarizability": 0.186,"solventAccessibleSurfaceArea": 1.81,"netChargeIndexOfSideChains": 0.021631,"averageMass": 113.1594},"K": {"hydrophobicity": -1.5,"hydrophilicity": 3,"hydrogenBond": 2,"volumeOfSideChains": 100,"polarity": 11.3,"polarizability": 0.219,"solventAccessibleSurfaceArea": 2.258,"netChargeIndexOfSideChains": 0.017708,"averageMass": 128.1741},"L": {"hydrophobicity": 1.06,"hydrophilicity": -1.8,"hydrogenBond": 2,"volumeOfSideChains": 93.5,"polarity": 5.2,"polarizability": 0.186,"solventAccessibleSurfaceArea": 1.931,"netChargeIndexOfSideChains": 0.051672,"averageMass": 113.1594	},"M": {"hydrophobicity": 0.64,"hydrophilicity": -1.3,"hydrogenBond": 2,"volumeOfSideChains": 94.1,"polarity": 5.7,"polarizability": 0.221,"solventAccessibleSurfaceArea": 2.034,"netChargeIndexOfSideChains": 0.002683,"averageMass": 131.1986},"N": {"hydrophobicity": -0.78,"hydrophilicity": 2,"hydrogenBond": 4,"volumeOfSideChains": 58.7,"polarity": 11.6,"polarizability": 0.134,"solventAccessibleSurfaceArea": 1.655,"netChargeIndexOfSideChains": 0.005392,"averageMass": 114.1039},"P": {"hydrophobicity": 0.12,"hydrophilicity": 0,"hydrogenBond": 2,"volumeOfSideChains": 41.9,"polarity": 8,"polarizability": 0.131,"solventAccessibleSurfaceArea": 1.468,"netChargeIndexOfSideChains": 0.239531,"averageMass": 97.1167},"Q": {"hydrophobicity": -0.85,"hydrophilicity": 0.2,"hydrogenBond": 4,"volumeOfSideChains": 80.7,"polarity": 10.5,"polarizability": 0.18,"solventAccessibleSurfaceArea": 1.932,"netChargeIndexOfSideChains": 0.049211,"averageMass": 128.1307},"R": {"hydrophobicity": -2.53,"hydrophilicity": 3,"hydrogenBond": 4,"volumeOfSideChains": 105,"polarity": 10.5,"polarizability": 0.18,"solventAccessibleSurfaceArea": 1.932,"netChargeIndexOfSideChains": 0.49211,"averageMass": 156.1875},"S": {"hydrophobicity": -0.18,"hydrophilicity": 0.3,"hydrogenBond": 4,"volumeOfSideChains": 29.3,"polarity": 9.2,"polarizability": 0.062,"solventAccessibleSurfaceArea": 1.298,"netChargeIndexOfSideChains": 0.004627,"averageMass": 87.0782},"T": {"hydrophobicity": -0.05,"hydrophilicity": -0.4,"hydrogenBond": 4,"volumeOfSideChains": 51.3,"polarity": 9.6,"polarizability": 0.108,"solventAccessibleSurfaceArea": 1.525,"netChargeIndexOfSideChains": 0.003352,"averageMass": 101.1051},"V": {"hydrophobicity": 1.08,"hydrophilicity": -1.5,"hydrogenBond": 2,"volumeOfSideChains": 71.5,"polarity": 5.9,"polarizability": 0.14,"solventAccessibleSurfaceArea": 1.645,"netChargeIndexOfSideChains": 0.057004,"averageMass": 99.1326},"W": {"hydrophobicity": 0.81,"hydrophilicity": -3.4,"hydrogenBond": 3,"volumeOfSideChains": 145.5,"polarity": 5.4,"polarizability": 0.409,"solventAccessibleSurfaceArea": 2.663,"netChargeIndexOfSideChains": 0.037977,"averageMass": 186.2132},"Y": {"hydrophobicity": 0.26,"hydrophilicity": -2.3,"hydrogenBond": 3,"volumeOfSideChains": 117.3,"polarity": 6.2,"polarizability": 0.298,"solventAccessibleSurfaceArea": 2.368,"netChargeIndexOfSideChains": 0.023599,"averageMass": 163.1760}}'
aapo=json.loads(aap)
aapo["A"]

def BuildVectorX(aminoacid):
    obj=aapo[aminoacid]
    resarr=np.array([[obj['averageMass'],obj['hydrogenBond'],obj['hydrophilicity'],obj['hydrophobicity'],obj['netChargeIndexOfSideChains'],obj['polarity'],obj['polarizability'],obj['solventAccessibleSurfaceArea'],obj['volumeOfSideChains']]])
    #return np.append(arr, resarr, axis=1)           
    return resarr

originalLength = len(aminoAcidSequence)
i=0
Xfor18=None
Xfor35=None
for aa in aminoAcidSequence:
    print(i)
    if(i==0):
        Xfor18=np.array(BuildVectorX(aa))
        Xfor35=np.array(BuildVectorX(aa))
    else:
        Xfor18=np.append(Xfor18,BuildVectorX(aa),axis=0)
        Xfor35=np.append(Xfor35,BuildVectorX(aa),axis=0)
    i=i+1

Xfor18=np.insert(Xfor18,0,np.zeros((17,9)),axis=0)
Xfor35=np.insert(Xfor35,0,np.zeros((17,9)),axis=0)
Xfor35=np.append(Xfor35,np.zeros((17,9)),axis=0)
#print(Xfor18.shape)
#print(Xfor18)
#print("===========================================================")
#print(Xfor35.shape)
#print(Xfor35)
#print("===========================================================")
#print(originalLength)

#check error
print('complete without error')


# In[5]:


Xa18=list()
Xa35=list()
for j in range(originalLength):
    Xa18.append(Xfor18[j:j+18])
    Xa35.append(Xfor35[j:j+35])

Xa18=np.array(Xa18)
Xa35=np.array(Xa35)

print(Xa18.shape)
print(Xa35.shape)

#check error
print('complete without error')


# In[6]:


def findMaxToOneHot(arr):
    maxElement=np.where(arr==np.amax(arr))
    zeroarr=list()
    for index in range(arr.shape[0]):
        if(index==maxElement[0]):
            zeroarr.append(1)
        else:
            zeroarr.append(0)
    return np.array(zeroarr).reshape(1,arr.shape[0])

#predict base on loaded model
ssyhat=ssModel.predict(Xa35)

print(ssyhat)
ssyhatOneHot = None

#convert to one hot by finding max 
for k in range(ssyhat.shape[0]):
    #print(findMaxToOneHot(ssyhat[k,:]))
    if(k==0):
        ssyhatOneHot=findMaxToOneHot(ssyhat[k,:])
    else:
        ssyhatOneHot=np.append(ssyhatOneHot,findMaxToOneHot(ssyhat[k,:]),axis=0)
        
print(ssyhatOneHot)

#check error
print('complete without error')


# In[7]:


angleyhat=angleModel.predict(Xa35)
print(angleModel.summary())
print(angleyhat)


# In[8]:


finalyhat=np.append(ssyhatOneHot, angleyhat,axis=1)
print(finalyhat)


# In[9]:


np.save(savingPath,finalyhat)


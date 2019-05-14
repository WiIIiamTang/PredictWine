# Read me before changing anything here

If you want to change the dataset, there's a couple things to keep in mind:

1. the name of the txt file has to be the same name as in the method that copies the csv into arrays

2. the ***last column*** of your data set is reserved for the y-array, or the class labels

3. When you use LogisticRegression it will predict for labels 0 and 1, so make sure the y-labels are properly defined beforehand. If not, you could also use the makeYLabels method.

4. make sure there are no missing values in the dataset
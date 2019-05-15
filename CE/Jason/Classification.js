///////////////////////////////////////////////////////////////////////////////////////////////
/*
Wine Classification

Original Java code by William Tand and Jason Dinh
Translated to JavaScript by Jason Dinh
*/
///////////////////////////////////////////////////////////////////////////////////////////////

const data = new Dataloader();

data.makeArrays("dataset_wine1.txt");
data.shuffleData();
data.trainTestSplit(0.70);

var x_train = data.XTrainArray();
var x_test = data.XTestArray();
var y_train = data.YTrainArray();
var y_test = data.YTestArray();

let scaler = new FeatureScaling();

scaler.standardScaler(x_train, x_test);

let classifier = new LogisticRegression(data.returnXTrainArray(), data.returnXTestArray(), data.returnYTrainArray(), data.returnYTestArray());

classifier.fit(0.001,30000,2,false);

var predictionsOnTrainSet = classifier.predictTrainSet(0.5);
var predictionsOnTestSet = classifier.predictTestSet(0.5);

let me = new ModelEvaluator();

var acc1 = 0;
var acc2 = 0;

acc1 = me.getAccuracy(y_train, predictionsOnTrainSet);
acc2 = me.getAccuracy(y_test, predictionsOnTestSet);

console.log("Model finished with " + acc1 + " accuracy on the training set.");
console.log("It got " + acc2 + " accuracy on the test set.");
console.log("Baseline accuracy of test set at " + ModelEvaluator.getBaselineAcc(y_test));
ModelEvaluator.confusionMatrix(y_test, predictionsOnTestSet);

console.log("Rsquared value on the test set = " + ModelEvaluator.mcfaddenRSquared(x_test, y_test, classifier.returnWeights()));
console.log("Rsquared value on the training set = " + ModelEvaluator.mcfaddenRSquared(x_train, y_train, classifier.returnWeights()));


ModelEvaluator.rankWeights(classifier.returnWeights());
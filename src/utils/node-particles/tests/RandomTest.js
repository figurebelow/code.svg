
"use strict";

require('chai').should();
let expect = require('chai').expect;

var Random = require ('../js/Random.js').Random;

describe("Random", function () {

    beforeEach(function() {
      this.rand = new Random();
    });

    describe('generate', function () {
        it ('should generate a value with Arcsine', function () {
            this.rand.arcsine(0, 1).should.be.a('number');
        });
        it ('should generate a value with Beta', function () {
            this.rand.beta(1, 1, 0, 1).should.be.a('number');
        });
        it ('should generate a value with Cauchy', function () {
            this.rand.cauchy(1, 1).should.be.a('number');
        });
        it ('should generate a value with Chi-Square', function () {
            this.rand.chiSquare(1).should.be.a('number');
        });
        it ('should generate a value with Cosine', function () {
            this.rand.cosine(0, 1).should.be.a('number');
        });
        it ('should generate a value with DoubleLog', function () {
            this.rand.doubleLog(0, 1).should.be.a('number');
        });
        it ('should generate a value with Erlang', function () {
            this.rand.erlang(1, 1).should.be.a('number');
        });
        it ('should generate a value with Exponential', function () {
            this.rand.exponential(1, 1).should.be.a('number');
        });
        it ('should generate a value with ExtremeValue', function () {
            this.rand.extremeValue(0.5, 5, 0, 1).should.be.a('number');
        });
        it ('should generate a value with F Ratio', function () {
            this.rand.fRatio(1, 1).should.be.a('number');
        });
        it ('should generate a value with Gamma', function () {
            this.rand.gamma(1, 1, 1).should.be.a('number');
        });
        it ('should generate a value with Laplace', function () {
            this.rand.laplace(1, 1).should.be.a('number');
        });
        it ('should generate a value with Logarithmic', function () {
            this.rand.logarithmic(0, 1).should.be.a('number');
        });
        it ('should generate a value with Logistic', function () {
            this.rand.logistic(1, 1).should.be.a('number');
        });
        it ('should generate a value with Lognormal', function () {
            this.rand.lognormal(1, 1, 1).should.be.a('number');
        });
        it ('should generate a value with Normal', function () {
            this.rand.normal(1, 1).should.be.a('number');
        });
        it ('should generate a value with Parabolic', function () {
            this.rand.parabolic(0, 1).should.be.a('number');
        });
        it ('should generate a value with Pareto', function () {
            this.rand.pareto(1).should.be.a('number');
        });
        it ('should generate a value with Pearson5', function () {
            this.rand.pearson5(1, 1).should.be.a('number');
        });
        it ('should generate a value with Pearson6', function () {
            this.rand.pearson6(1, 1, 1).should.be.a('number');
        });
        it ('should generate a value with Power', function () {
            this.rand.power(1).should.be.a('number');
        });
        it ('should generate a value with Rayleigh', function () {
            this.rand.rayleigh(1, 1).should.be.a('number');
        });
        it ('should generate a value with Student\'s T', function () {
            this.rand.studentT(1).should.be.a('number');
        });
        it ('should generate a value with Triangular', function () {
            this.rand.triangular(0, 1, 1).should.be.a('number');
        });
        it ('should generate a value with Uniform', function () {
            this.rand.uniform(0, 1).should.be.a('number');
        });
        it ('should generate a value with Weibull', function () {
            this.rand.weibull(1, 1, 1).should.be.a('number');
        });
        it ('should generate a value with Bernoulli', function () {
            this.rand.bernoulli(0.5).should.be.a('number');
        });
        it ('should generate a value with Binomial', function () {
            this.rand.binomial(10, 0.5).should.be.a('number');
        });
        it ('should generate a value with Geometric', function () {
            this.rand.geometric(0.5).should.be.a('number');
        });
        it ('should generate a value with Hypergeometric', function () {
            this.rand.hypergeometric(6, 10, 4).should.be.a('number');
        });
        it ('should generate a value with NegativeBinomial', function () {
            this.rand.negativeBinomial(5, 0.5).should.be.a('number');
        });
        it ('should generate a value with Pascal', function () {
            this.rand.pascal(5, 0.5).should.be.a('number');
        });
        it ('should generate a value with Poisson', function () {
            this.rand.poisson(5).should.be.a('number');
        });
        it ('should generate a value with UniformDiscrete', function () {
            this.rand.uniformDiscrete(1, 10).should.be.a('number');
        });

        it ("Uniform should generate a value given a string seed", function () {
          var r = new Random("123");
          r.uniform(0,1).should.be.a("number");
        });

        it ("Uniform should generate a value given a number", function () {
          var r = new Random(12);
          r.uniform(0,1).should.be.a("number");
        });

        it ("should generate values in [0,1] when no parameters are passed and no seed is used", function () {
          var r = new Random ();
          var results = [1,2,3,4,5,6,7,8,9,10].map(function () { return r.random();});
          results.forEach (function (item) {
            expect(item).be.a("number").gt(0).lt(1);
          });
        });

        it ("should generate values in [0,1] when no parameters are passed", function () {
          var r = new Random (900);
          var results = [1,2,3,4,5,6,7,8,9,10].map(function () { return r.random();});
          results.forEach (function (item) {
            expect(item).be.a("number").gt(0).lt(1);
          });
        });

        it ("should generate values in [0,val] when one parameter is passed", function () {
          var r = new Random (900);
          var results = [1,2,3,4,5,6,7,8,9,10].map(function () { return r.random(20);});
          results.forEach (function (item) {
            expect(item).be.a("number").gt(0).lt(20);
          });
        });

        it ("should generate values in [low,up] when two parameters are used", function () {
          var r = new Random (900);
          var results = [1,2,3,4,5,6,7,8,9,10].map(function () { return r.random(15,23);});
          results.forEach (function (item) {
            expect(item).be.a("number").gt(15).lt(23);
          });
        });

        it ("should generate values when a string is used as seed", function () {
          var r = new Random ("bluecoat");
          var results = [1,2,3,4,5,6,7,8,9,10].map(function () { return r.random(10);});
          results.forEach (function (item) {
            expect(item).be.a("number").gt(0).lt(10);
          });
        });
    });
});

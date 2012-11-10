'use strict';

/* jasmine specs for filters go here */

describe('filter', function() {

    describe('date', function() {
        var dateFilter;

        beforeEach(inject(function($filter) {
            dateFilter =  $filter('date');
        }));

        it('should properly format/convert unix time', function() {
            expect(dateFilter(1350400707*1000, 'mediumDate')).toEqual('Oct 16, 2012');
            expect(dateFilter(1350400707*1000, 'yyyy')).toEqual('2012');
            expect(dateFilter(1350400707*1000, 'shortTime')).toEqual('10:18 AM');
            expect(dateFilter(1350400707*1000, 'medium')).toEqual('Oct 16, 2012 10:18:27 AM');
        });
    });

    describe('number', function() {
        var numberFilter;

        beforeEach(inject(function($filter) {
            numberFilter =  $filter('number');
        }));

        it('should format integer', function() {
            expect(numberFilter(1234)).toBe('1,234');
            //expect(numberFilter(1234.235)).toEqual('1,234.24');
        });
    });

    describe('currency', function() {
        var currencyFilter;

        beforeEach(inject(function($filter) {
            currencyFilter =  $filter('currency');
        }));

        it('should format dollar currency', function() {
            expect(currencyFilter(123.00)).toBe('$123.00');
        });
    });

    describe('linky', function() {
        var linky;

        beforeEach(inject(function($filter) {
            linky =  $filter('linky');
        }));

        it('should convert url string into a clickable link', function() {
            expect(linky("http://www.apple.com")).toEqual('<a href="http://www.apple.com">http://www.apple.com</a>');
            expect(linky("admin@toodledo.com")).toEqual('<a href="mailto:admin@toodledo.com">admin@toodledo.com</a>');
        });
    });

    beforeEach(module('appFilters'));

    describe('length', function() {
        it('should convert minutes to hours + minutes', inject(function(lengthFilter) {
            expect(lengthFilter(660)).toBe('11hrs');
            expect(lengthFilter(65)).toBe('1hr 5mins');
            expect(lengthFilter(1)).toBe('1min');
        }));
    });

    describe('checkmark', function() {
        it('should convert boolean values to unicode checkmark or cross', inject(function(checkmarkFilter) {
            expect(checkmarkFilter(true)).toBe('\u2713');
            expect(checkmarkFilter(false)).toBe('\u2718');
        }));
    });

    describe('percent', function() {
        it('should convert integer value to percentage', inject(function(percentFilter) {
            expect(percentFilter(34)).toBe('34\u0025');
        }));
        it('should return empty string', inject(function(percentFilter) {
            expect(percentFilter('abcd')).toBe('');
        }));
    });




    
});

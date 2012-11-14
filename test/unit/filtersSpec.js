'use strict';

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

    beforeEach(module('appFilters'));

    describe('isUrl', function() {
        var linky;

        beforeEach(inject(function($filter) {
            linky =  $filter('linky');
        }));

        it('should convert email address string into a clickable link', function() {
            expect(linky("admin@toodledo.com")).toEqual('<a href="mailto:admin@toodledo.com">admin@toodledo.com</a>');
        });

        it('should convert url string into a clickable link', inject(function(urlFilter) {
            expect(linky("http://www.apple.com")).toEqual('<a href="http://www.apple.com">http://www.apple.com</a>');
            expect(linky("https://www.apple.com")).toEqual('<a href="https://www.apple.com">https://www.apple.com</a>');
            expect(urlFilter("www.apple.com")).toEqual('<a href="http://www.apple.com">http://www.apple.com</a>');
        }));

        it('should return empty string', inject(function(urlFilter) {
            expect(urlFilter('')).toBe('');
            expect(urlFilter('abcd')).toBe('abcd');
        }));
    });


    describe('length', function() {
        it('should convert minutes to hours + minutes', inject(function(lengthFilter) {
            expect(lengthFilter(660)).toBe('11hrs');
            expect(lengthFilter(65)).toBe('1hr 5mins');
            expect(lengthFilter(1)).toBe('1min');
        }));

        it('should return empty string', inject(function(lengthFilter) {
            expect(lengthFilter({})).toBe('0');
            expect(lengthFilter([])).toBe('0');
            expect(lengthFilter(true)).toBe('0');
            expect(lengthFilter(false)).toBe('0');
            expect(lengthFilter('')).toBe('0');
            expect(lengthFilter('abcd')).toBe('0');
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
            expect(percentFilter({})).toBe('');
            expect(percentFilter([])).toBe('');
            expect(percentFilter(true)).toBe('');
            expect(percentFilter(false)).toBe('');
            expect(percentFilter('')).toBe('');
            expect(percentFilter('abcd')).toBe('');
        }));
    });
});
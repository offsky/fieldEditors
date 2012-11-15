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
        
         it('should properly format empty or invalid as empty string', function() {
            expect(dateFilter('', 'mediumDate')).toEqual('');
            expect(dateFilter('foo', 'yyyy')).toEqual('');
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
        
         it('should format dollar currency even if already formatted', function() {
            expect(currencyFilter("$123.00")).toBe('$123.00');
        });
        
         it('should be empty string for invalid', function() {
            expect(currencyFilter("foo")).toBe('');
        });
    });

    beforeEach(module('appFilters'));

	describe('email', function() {
        var linky;

        beforeEach(inject(function($filter) {
            linky =  $filter('linky');
        }));

        it('should convert email address string into a clickable link', function() {
            expect(linky("admin@toodledo.com")).toEqual('<a href="mailto:admin@toodledo.com">admin@toodledo.com</a>');
        });

      	it('should echo non-email results', function() {
            expect(linky("")).toEqual('');
            expect(linky("foo")).toEqual('foo');
        });
    });
    
    describe('isUrl', function() {
        var linky;

        beforeEach(inject(function($filter) {
            linky =  $filter('linky');
        }));

        it('should convert url string into a clickable link', inject(function(urlFilter) {
            expect(urlFilter("http://www.apple.com")).toEqual('<a href="http://www.apple.com">http://www.apple.com</a>');
            expect(urlFilter("https://www.apple.com")).toEqual('<a href="https://www.apple.com">https://www.apple.com</a>');
            expect(urlFilter("www.apple.com")).toEqual('<a href="http://www.apple.com">http://www.apple.com</a>');
        }));

        it('should echo non-link results', inject(function(urlFilter) {
            expect(urlFilter('')).toBe('');
            expect(urlFilter('abcd')).toBe('abcd');
        }));
    });

 	describe('rating', function() {
        it('should have a test', inject(function(urlFilter) {
            expect(1).toEqual(2);
        }));
    });
	describe('star', function() {
        it('should have a test', inject(function(urlFilter) {
            expect(1).toEqual(2);
        }));
    });
	describe('icon', function() {
        it('should have a test', inject(function(urlFilter) {
            expect(1).toEqual(2);
        }));
    });
    describe('phone', function() {
        it('should have a test', inject(function(urlFilter) {
            expect(1).toEqual(2);
        }));
    });
    describe('isbn', function() {
        it('should have a test', inject(function(urlFilter) {
            expect(1).toEqual(2);
        }));
    });
    
    describe('length', function() {
        it('should convert minutes to hours + minutes', inject(function(lengthFilter) {
            expect(lengthFilter(660)).toBe('11hrs');
            expect(lengthFilter(65)).toBe('1hr 5mins');
            expect(lengthFilter(1)).toBe('1min');
        }));
		 it('should pass through already formatted values', inject(function(lengthFilter) {
            expect(lengthFilter("11hrs")).toBe('11hrs');
            expect(lengthFilter("1hr 5mins")).toBe('1hr 5mins');
            expect(lengthFilter("1min")).toBe('1min');
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
            expect(checkmarkFilter(1)).toBe('\u2713');
            expect(checkmarkFilter("something")).toBe('\u2713');
            expect(checkmarkFilter(false)).toBe('\u2718');
            expect(checkmarkFilter(null)).toBe('\u2718');
            expect(checkmarkFilter(0)).toBe('\u2718');
        }));
    });

    describe('percent', function() {
        it('should convert integer value to percentage', inject(function(percentFilter) {
            expect(percentFilter(34)).toBe('34\u0025');
        }));
        it('should pass through already converted value', inject(function(percentFilter) {
            expect(percentFilter("34%")).toBe('34\u0025');
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
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

    beforeEach(module('appFilters'));

    describe('money', function() {
        var moneyFilter;

        beforeEach(inject(function($filter) {
            moneyFilter = $filter('money');
        }));

        it('should format dollar currency', function() {
            expect(moneyFilter(123.00)).toBe('$123.00');
        });
        
         it('should format dollar currency even if already formatted', function() {
            expect(moneyFilter("$123.00")).toBe('$123.00');
        });
        
         it('should be empty string for invalid', function() {
            expect(moneyFilter("foo")).toBe('');
        });
    });



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
        var linky,
            urlFilter;

        beforeEach(inject(function($filter) {
            linky =  $filter('linky');
            urlFilter = $filter('url');
        }));

        it('should convert url string into a clickable link', function() {
            expect(urlFilter("http://www.apple.com")).toEqual('<a href="http://www.apple.com">http://www.apple.com</a>');
            expect(urlFilter("https://www.apple.com")).toEqual('<a href="https://www.apple.com">https://www.apple.com</a>');
            expect(urlFilter("www.apple.com")).toEqual('<a href="http://www.apple.com">http://www.apple.com</a>');
        });

        it('should echo non-link results', function() {
            expect(urlFilter('')).toBe('');
            expect(urlFilter('abcd')).toBe('abcd');
        });
    });

 	describe('rating', function() {
         var ratingFilter;

         beforeEach(inject(function($filter) {
             ratingFilter = $filter('rating');
         }));

        it('should have a test', function() {
            expect(1).toEqual(2);
        });
    });

	describe('star', function() {
        var starFilter;

        beforeEach(inject(function($filter) {
            starFilter = $filter('star');
        }));

        it('should have a test', function() {
            expect(1).toEqual(2);
        });
    });

	describe('icon', function() {
        var iconFilter;

        beforeEach(inject(function($filter) {
            iconFilter = $filter('icon');
        }));

        it('should have a test', function() {
            expect(1).toEqual(2);
        });
    });

    describe('phone', function() {
        var phoneFilter;

        beforeEach(inject(function($filter) {
            phoneFilter = $filter('phone');
        }));


        it('should have a test', function() {
            expect(1).toEqual(2);
        });
    });

    describe('isbn', function() {
        var isbnFilter;

        beforeEach(inject(function($filter) {
            isbnFilter = $filter('isbn');
        }));

        it('should have a test', function() {
            expect(1).toEqual(2);
        });
    });
    
    describe('length', function() {
        var lengthFilter;

        beforeEach(inject(function($filter) {
            lengthFilter = $filter('length');
        }));

        it('should convert minutes to hours + minutes', function() {
            expect(lengthFilter(660)).toBe("11hrs");
            expect(lengthFilter(65)).toBe("1hr 5mins");
            expect(lengthFilter(100)).toBe("1hr 40mins");
            expect(lengthFilter(1)).toBe("1min");
            expect(lengthFilter("23h")).toBe("23hrs");
            expect(lengthFilter("90min")).toBe("1hr 30mins");
            expect(lengthFilter("1hrs 90mins")).toBe("2hrs 30mins");
            expect(lengthFilter("1hours")).toBe("1hr");
            expect(lengthFilter("1hour")).toBe("1hr");
            expect(lengthFilter("1hrs")).toBe("1hr");
            expect(lengthFilter("1hr")).toBe("1hr");
            expect(lengthFilter("1h")).toBe("1hr");
            expect(lengthFilter("1m")).toBe("1min");
            expect(lengthFilter("1minute")).toBe("1min");
            expect(lengthFilter("11hr")).toBe("11hrs");
        });

        it('should pass through already formatted values', function() {
            expect(lengthFilter("11hrs")).toBe('11hrs');
            expect(lengthFilter("1hr 5mins")).toBe('1hr 5mins');
            expect(lengthFilter("1min")).toBe('1min');
        });

        it('should return empty string', function() {
            expect(lengthFilter(0)).toBe("");
            expect(lengthFilter(-1)).toBe("");
            expect(lengthFilter("")).toBe("");
            expect(lengthFilter("abcd")).toBe("");
        });
    });

    describe('checkmark', function() {
        var checkmarkFilter;

        beforeEach(inject(function($filter) {
            checkmarkFilter = $filter('checkmark');
        }));

        it('should convert boolean values to unicode checkmark or cross', function() {
            expect(checkmarkFilter(true)).toBe('\u2713');
            expect(checkmarkFilter(1)).toBe('\u2713');
            expect(checkmarkFilter("something")).toBe('\u2713');
            expect(checkmarkFilter(false)).toBe('\u2718');
            expect(checkmarkFilter(null)).toBe('\u2718');
            expect(checkmarkFilter(0)).toBe('\u2718');
        });
    });

    describe('percent', function() {
        var percentFilter;

        beforeEach(inject(function($filter) {
            percentFilter = $filter('percent');
        }));

        it('should convert integer value to percentage', function() {
            expect(percentFilter(34)).toBe('34\u0025');
        });

        it('should pass through already converted value', function() {
            expect(percentFilter("34%")).toBe('34\u0025');
        });

        it('should return empty string', function() {
            expect(percentFilter({})).toBe('');
            expect(percentFilter([])).toBe('');
            expect(percentFilter(true)).toBe('');
            expect(percentFilter(false)).toBe('');
            expect(percentFilter('')).toBe('');
            expect(percentFilter('abcd')).toBe('');
        });
    });
});
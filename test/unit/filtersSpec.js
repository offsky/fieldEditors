'use strict';

/* jasmine specs for filters go here */

describe('filter', function() {

    beforeEach(module('taskFilters'));

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
    });


    describe('linky', function() {
        var linky;

        beforeEach(module('ngSanitize'));

        beforeEach(inject(function($filter) {
            linky =  $filter('linky');
        }));

        it('should convert url string into a clickable link', function() {
            expect(linky("http://www.apple.com")).toEqual('<a href="http://www.apple.com">http://www.apple.com</a>');
        });

        it('should conver mailto string into a clickable mailto link', function() {
           expect(linky("admin@toodledo.com")).toEqual('<a href="mailto:admin@toodledo.com">admin@toodledo.com</a>');
        });
    });
    
});

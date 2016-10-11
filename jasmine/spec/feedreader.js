$(function() {

    describe('RSS Feeds', function() {

        // confirm that there are feeds to be loaded
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // test that all feeds have a url property and the url is not empty
        it ('urls are defined', function() { 
            allFeeds.forEach(function (feed) { 
                expect(feed.url).toBeDefined();
                expect(feed.url.trim()).not.toBe('');
            });
        });

        // test that all feeds have a name property and the name is not empty
        it ('name is defined', function() { 
            allFeeds.forEach(function (feed) { 
                expect(feed.name).toBeDefined();
                expect(feed.name.trim()).not.toBe('');
            });
        });
    });


    // new test suite for the menu 
    describe('The menu', function() { 
        // test that the menu is hidden on load
        it('is hidden by default', function() { 
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        // test that menu appears and disappears when menu icon is clicked 
        it('changes visbility when icon is clicked', function() { 
            var menuIcon = $('.menu-icon-link'),
                $body = $('body');

            //click to show menu
            menuIcon.click();
                // menu should be visible
                expect($('body').hasClass('menu-hidden')).toBe(false);
                $body = $('body');

            //click to hide menu
            menuIcon.click();
                // menu should be hidden
                expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    // new test suite for loading feeds (async)
    describe('Initial Entries', function() { 

        // set callback funciton for when loadFeed() has completed
        beforeEach(function(done){ 
            loadFeed(0,function() { ;
                done();
            });
        });

        // test that there is an entry for the loaded feed
        it('has an entry in the feed', function(done){
            var entry = $('.feed .entry')[0];
            expect(entry).toBeDefined();
            done();
        });
    });

    // new test suite for loading new feed upon menu selection (async)
    describe('New Feed Selection',function() {
        var prevFeed = $('.feed').html();

            // set callback funciton for when loadFeed() has completed
            beforeEach(function(done) { 
                loadFeed(1,function() {
                    done();
                });
            });

            // check against the initial feed loaded (id = 0)
            it('updated content', function(done) {
                expect($('.feed').html()).not.toEqual(prevFeed);
                done();
            });
    });

}()); 

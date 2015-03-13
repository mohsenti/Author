jQuery(document).ready(function($){

    /* Set variables */

    var toggleDropdown = $('.toggle-dropdown');
    var sidebar = $('#main-sidebar');
    var siteHeader = $('#site-header');
    var main = $('#main');
    var sidebarPrimary = $('#sidebar-primary');

    // get the selector for the primary menu
    var menu = $('.menu-unset').length ? $('.menu-unset') : $('#menu-primary-items');

    // for scrolling function
    var lastWindowPos = 0;
    var top, bottom = false;
    var topOffset = 0;
    var resizeTimer;

    /* Call functions */

    positionSidebar();
    setMainMinHeight();

    $(window).resize(function(){
        positionSidebar();
        closeMainSidebar();
        setMainMinHeight();
    });

    // add fitVids to videos in posts
    $('.post-content').fitVids();

    // display the primary menu at mobile widths
    $('#toggle-navigation').on('click', openPrimaryMenu);

    // display the dropdown menus
    toggleDropdown.on('click', openDropdownMenu);

    // extend sidebar height when dropdown clicked
    toggleDropdown.on('click', adjustSidebarHeight);

    function openPrimaryMenu() {

        // if menu open
        if( sidebar.hasClass('open') ) {

            // remove styling class
            sidebar.removeClass('open');

            // close all ULs by removing increased max-height
            $('#menu-primary-items ul, .menu-unset ul').removeAttr('style');

            // close all ULs and require 2 clicks again when reopened
            $('.menu-item-has-children').each(function(){
                if( $(this).hasClass('open') ) {
                    $(this).removeClass('open');
                }
            });

            // set minimum height for main
            setMainMinHeight();

            // return sidebar to initial top position
            positionSidebar();

            // if menu is closed, unbind auto close function
            $(window).unbind('scroll', autoCloseMenu);

        } else {
            sidebar.addClass('open');

            var windowWidth = $(window).width();

            // if at width when menu is absolutely positioned
            if( windowWidth > 549 && windowWidth < 950 ) {

                var socialIconsHeight = 0;

                if( siteHeader.find('.social-media-icons').length ) {
                    socialIconsHeight = siteHeader.find('.social-media-icons').find('ul').outerHeight();
                }

                var menuHeight = menu.outerHeight();

                var headerHeight = sidebar.outerHeight();

                var sidebarPrimaryHeight = sidebarPrimary.height();

                main.css('min-height', sidebarPrimaryHeight + headerHeight + socialIconsHeight + menuHeight + 'px' );

                // close menu automatically if scrolled past
                $(window).scroll(autoCloseMenu);
            }
        }
    }

    function openDropdownMenu() {

        var menuItem = $(this).parent();

        if( menuItem.hasClass('open') ) {
            menuItem.removeClass('open');
            $(this).children('span').text('open child menu');
            $(this).attr('aria-expanded', 'false');
        } else {
            menuItem.addClass('open');
            $(this).children('span').text('close child menu');
            $(this).attr('aria-expanded', 'true');
        }
    }

    // absolutely position the sidebar
    function positionSidebar() {

        var windowWidth = $(window).width();

        // if at width when menu is absolutely positioned
        if( windowWidth > 549 && windowWidth < 950 ) {

            var socialIconsHeight = 0;

            if( siteHeader.find('.social-media-icons').length ) {
                socialIconsHeight = siteHeader.find('.social-media-icons').find('ul').outerHeight();
            }

            var menuHeight = menu.outerHeight();
            var headerHeight = sidebar.outerHeight();

            $('#menu-primary').css('top', headerHeight + socialIconsHeight + 24 + 'px');

            // below the header and menu + 24 for margin
            sidebarPrimary.css('top', headerHeight + socialIconsHeight + menuHeight + 48 + 'px');
        }
        else {
            $('#sidebar-primary, #menu-primary').css('top', '');
        }
    }

    // move sidebar when dropdown menu items opened
    function adjustSidebarHeight() {

        // get the current window width
        var windowWidth = $(window).width();

        // if at width when menu is absolutely positioned
        if( windowWidth > 549 && windowWidth < 950 ) {

            // get the submenu
            var list = $(this).next();

            // set the height variable
            var listHeight = 0;

            // get the height of all the child li elements combined (because ul has max-height: 0)
            list.children().each(function(){
                listHeight = listHeight + $(this).height();
            });

            // get the current top value for the sidebar
            var sidebarTop = sidebarPrimary.css('top');

            var mainHeight = main.css('min-height');

            // remove 'px' so addition is possible
            sidebarTop = parseInt(sidebarTop);

            // remove 'px' so addition is possible
            mainHeight = parseInt(mainHeight);

            // get the li containing the toggle button
            var menuItem = $(this).parent();

            // dropdown is being opened (increase sidebar top value)
            if( menuItem.hasClass('open') ) {
                sidebarPrimary.css('top', sidebarTop + listHeight + 'px');
                main.css('min-height', mainHeight + listHeight + 'px');
            }
            // dropdown is being closed (decrease sidebar top value)
            else {
                sidebarPrimary.css('top', sidebarTop - listHeight + 'px');
                main.css('min-height', mainHeight - listHeight + 'px');
            }
        }
    }

    // if sidebar open and resized over 950px, automatically close it
    function closeMainSidebar() {

        // if no longer at width when menu is absolutely positioned
        if( $(window).width() > 949 && sidebar.hasClass('open') ) {
            // run function to close sidebar and all menus
            openPrimaryMenu();
        }
    }

    // keep light gray background all the way to footer
    function setMainMinHeight() {
        // refresh
        main.css('min-height', '');
        main.css('min-height', $('#overflow-container').height() + 'px');
    }

    // Sidebar scrolling.
    function resize() {

        if ( 950 > $(window).width() ) {
            var top, bottom = false;
            sidebar.removeAttr( 'style' );
        }
    }

    function scroll() {
        var body = $('#overflow-container');
        var windowWidth   = $(window).width();
        var windowHeight  = $(window).height();
        var bodyHeight    = body.height();
        var sidebarHeight = sidebar.outerHeight();
        var windowPos = $(window).scrollTop();
        var adminbarOffset = $('body').hasClass( 'admin-bar' ) ? $( '#wpadminbar' ).height() : 0;

        if ( 950 > windowWidth ) {
            return;
        }

        // if the sidebar height + admin bar is greater than the window height
        if ( sidebarHeight + adminbarOffset > windowHeight ) {
            // if the window has been scrolled down
            if ( windowPos > lastWindowPos ) {
                if ( top ) {
                    top = false;
                    topOffset = ( sidebar.offset().top > 0 ) ? sidebar.offset().top - adminbarOffset : 0;
                    sidebar.attr( 'style', 'top: ' + topOffset + 'px;' );
                } else if ( ! bottom && windowPos + windowHeight > sidebarHeight + sidebar.offset().top && sidebarHeight + adminbarOffset < bodyHeight ) {
                    bottom = true;
                    sidebar.attr( 'style', 'position: fixed; bottom: 0;' );
                }
                // if sidebar was shorter then menu dropdown made it taller
                else if ( ( sidebarHeight + adminbarOffset > windowHeight ) && ! bottom  ) {
                    topOffset = ( sidebar.offset().top > 0 ) ? sidebar.offset().top - adminbarOffset : 0;
                    sidebar.attr( 'style', 'top: ' + topOffset + 'px;' );
                }
            }
            // if the window has been scrolled up
            else if ( windowPos < lastWindowPos ) {
                if ( bottom ) {
                    bottom = false;
                    topOffset = ( sidebar.offset().top > 0 ) ? sidebar.offset().top - adminbarOffset : 0;
                    sidebar.attr( 'style', 'top: ' + topOffset + 'px;' );
                } else if ( ! top && windowPos > 0 && windowPos + adminbarOffset < sidebar.offset().top ) {
                    top = true;
                    sidebar.attr( 'style', 'position: fixed;' );
                }
            }
            // if the window has not been previously scrolled
            else {
                top = bottom = false;
            }
        } else if ( ! top ) {
            top = true;
            sidebar.attr( 'style', 'position: fixed;' );
        }

        lastWindowPos = windowPos;
    }

    $(window)
        .on( 'scroll', scroll )
        .on( 'resize', function() {
            clearTimeout( resizeTimer );
            resizeTimer = setTimeout( resizeAndScroll, 500 );
        } );
    sidebar.on( 'click keydown', 'button', resizeAndScroll );

    function resizeAndScroll() {
        resize();
        scroll();
    }
    resizeAndScroll();

    for ( var i = 1; i < 6; i++ ) {
        setTimeout( resizeAndScroll, 100 * i );
    }

    function autoCloseMenu() {

        // get position of the bottom of the sidebar
        var sidebarPrimaryBottom = sidebarPrimary.offset().top + sidebarPrimary.height();

        // window distance from top
        var topDistance = $(window).scrollTop();

        // if visitor scrolled 50px past bottom of sidebar, close menu
        if (topDistance > sidebarPrimaryBottom + 50) {
            openPrimaryMenu();
        }
    }
});
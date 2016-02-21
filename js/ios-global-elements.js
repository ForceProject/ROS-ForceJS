jQuery(function ($) {
    var head = $('head');
    var links = $('');
    head.add(links).appendTo(head);

    var body = $('#sidebar-wrapper');
    var sideNav = $('<ul class="sidebar-nav">\
                    <li class="sidebar-brand">\
                        <a href="#">\
                        iOS Client\
                        </a>\
                    </li>\
                    <li>\
                        <a href="Overview.html">Overview</a>\
                    </li>\
                    <li>\
                        <a href="Template.html">Getting Started</a>\
                    </li>\
                     <li>\
                        <ul class="accordion">\
                            <li>\
                                <div class="acc-header">\
                                    <a href="#" class="head" title="Click to expand.">Tile Documentation</a>\
                                    <a href="#" class="arrow">↓</a>\
                                </div>\
                                <div class="content">\
                                    <ul>\
                                        <li>\
                                            <a href="Delegate_Functions.html">Button</a>\
                                        </li>\
                                        <li>\
                                            <a href="Built-In_Functions.html">Textfield</a>\
                                        </li>\
                                        <li>\
                                            <a href="Chat_Demo.html">Label</a>\
                                        </li>\
                                        <li>\
                                            <a href="Chat_Demo.html">Joystick</a>\
                                        </li>\
                                        <li>\
                                            <a href="Chat_Demo.html">Text View</a>\
                                        </li>\
                                        <li>\
                                            <a href="Chat_Demo.html">Image View</a>\
                                        </li>\
                                        <li>\
                                            <a href="Chat_Demo.html">MJPEG Stream View</a>\
                                        </li>\
                                        <li>\
                                            <a href="Chat_Demo.html">Switch</a>\
                                        </li>\
                                        <li>\
                                            <a href="Chat_Demo.html">Segmented Control</a>\
                                        </li>\
                                        <li>\
                                            <a href="Chat_Demo.html">Horizontal Slider</a>\
                                        </li>\
                                        <li>\
                                            <a href="Chat_Demo.html">Vertical Slider</a>\
                                        </li>\
                                        <li>\
                                            <a href="Chat_Demo.html">Progress Bar</a>\
                                        </li>\
                                    </ul>\
                                </div>\
                            </li>\
                        </ul>\
                         <p><br/></p>\
                    </li>\
                    <li>\
                        <a href="Known_Issues.html">Known Issues</a>\
                    </li>\
                </ul>');

    body.add(sideNav).appendTo(body);
});

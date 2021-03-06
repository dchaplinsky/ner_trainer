;
"use strict";

var Nemesis = Nemesis || {
        State: {
            workplace: null,
            task_title: "",
            task_id: 0,
            task_init_state: null,
            task_state: null,
            task_wrapper: null,
            selected_terms: []
        },
        event_handlers: function () {
            var ne = Nemesis;

            ne.State.workplace
                .on("click", "a#save-button", function (e) {
                    e.preventDefault();
                })
                .on("click", ".mfp-close", function (e) {
                    e.preventDefault();

                    ne.load_next();
                    ne.State.workplace.find(".mfp-hide").hide();
                });

            // be able to call methods fluently
            return ne;
        },
        remap_text: function () {
        },
        load_next: function () {
            var nes = Nemesis.State,
                meta = null;

            $.get(
                "/next",
                function (data) {
                    nes.task_wrapper.html(data);

                    meta = $.parseJSON(
                        nes.task_wrapper
                            .find("#task_meta")
                            .attr('data-payload'));
                    nes.task_id = meta.id;
                    nes.task_title = meta.title;
                    nes.task_init_state = nes.task_state = meta.structure;
                },
                "html");
        },
        save_report: function () {
            // TODO: Breathe the life into this barren method.
            $.post(
                "/report",
                {},
                function(data){},
                "json");
        },
        /* http://xkcd.com/292/ */
        init: function () {
            var ne = this;

            $.ajaxSetup({traditional: true});

            $(function () {
                ne.State.workplace = $(".site-wrapper");
                ne.State.task_wrapper = ne.State.workplace.find("#current_task");
                ne.event_handlers();
            });
        }
    };

Nemesis.init();

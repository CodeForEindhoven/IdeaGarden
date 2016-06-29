//=require Menu.js

var DashboardPage = {
    controller: function(){
        this.token = Model.token;

        this.submit = function(e){

        };

        this.logout = function(e){
            Model.logout();
            m.route("/ideas");
        };
    },
    view: function(ctrl) {
        return m("div", [
            m.component(Menu),
            m("div", {class: "ui page"}, [
                m("div", {class: "ui grid"}, [
                    m("div", {class: "ui col-12"}, [
                        m("h2", "Mijn profiel"),
                        m("div", {class: "ui card"}, [
                            m("form", {class: "ui", onsubmit: ctrl.logout.bind(ctrl)}, [
                                m("button", {type:"submit", class: "ui"}, "Nu Uitloggen")
                            ]),
                        ]),
                        /*
                        m("div", {class: "ui card"}, [
                            m("form", {class: "ui", onsubmit: ctrl.submit.bind(ctrl)}, [
                                m("label", {class: "ui"}, "Gebruikersnaam"),
                                m("input", {class: "ui", name: "title", placeholder: "", value: ctrl.token().name}),
                                m("label", {class: "ui"}, "Email adres"),
                                m("input", {class: "ui", name: "title", placeholder: "", value: ctrl.token().email}),
                                m("button", {type:"submit", class: "ui"}, "wijzigingen opslaan")
                            ]),
                        ]),
                        */
                        m("h2", "Mijn ideeën"),
                        m.component(MyIdeasOverview),
                    ]),
                    m.component(Footer)
                ]),
            ])
        ]);
    }
};

var MyIdeasOverview = {
    controller: function(){
        this.cards = Model.getMyIdeas();
    },
    view: function(ctrl){
        return m("div",
            ctrl.cards().map(function(i){
                //return m("div", i.title);
                return m.component(IdeaCard, i);
            })
        );
    }
};

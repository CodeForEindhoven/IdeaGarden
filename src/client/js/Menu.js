//=require LoginPopup.js
//=require ViewModels.js

var Menu = {
    controller: function(){
        this.token = Model.token;

        this.ideas = function(){
            m.route("/ideas");
        };

        this.loginClick = function(){
            ViewModel.loginPopup(true);
        };

        this.dashboardClick = function(){
            m.route("/dashboard");
        };
    },
    view: function(ctrl, data) {
        return m("nav", {class: "ui menu"}, [
            m.component(LoginPopup),
            m("img", {src: "static/fish logo.png", class: "ui menuelement"}),
            m("h3", {class: "ui menuelement"}, "Ideeënvijver"),
            m("a", {class: "ui menuelement option"}, "Uitdaging"),
            m("a", {class: "ui menuelement option", onclick: ctrl.ideas}, "Ideeën"),
            (function(){
                if(ctrl.token().succes) {
                    return m("a", {class: "ui menuelement right", onclick: ctrl.dashboardClick.bind(ctrl)}, ctrl.token().email);
                }
                return m("a", {class: "ui menuelement right", onclick: ctrl.loginClick.bind(ctrl)}, "Login");
            })()
        ]);
    }
};

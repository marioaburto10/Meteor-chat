Messages = new Mongo.Collection("msgs");

Meteor.methods({
  sendMessage: function (message) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Messages.insert({
      messageText: message,
      createdAt: new Date(),
      username: Meteor.user().username  // <-add real username
    });
  }
});

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish("messages", function () {
    return Messages.find();
  });
}

/* scrolling code */

if (Meteor.isClient) {
  // This code only runs on the client
  Meteor.subscribe("messages");

  /* helper code */
  Template.body.helpers({
    recentMessages: function () {
      return Messages.find({}, {sort: {createdAt: 1}});
    },
    /* unread message helper */
  });

  /*chat window scrolling*/

  /*events*/
  Template.body.events({
    "submit .new-message": function (event) {
      var text = event.target.text.value;

      Meteor.call("sendMessage", text);

      event.target.text.value = "";
      event.preventDefault();
    },

    /* scroll event */

  });

   /*account config*/ 
   // Keep this if you want it to ask for username instead of email
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

}
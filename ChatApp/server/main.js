import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  /* scrolling code */
  Meteor.publish("messages", function () {
    return Messages.find();
  });
});

Meteor.methods({
  sendMessage: function (message) {
    // if (! Meteor.userId()) {
    //   throw new Meteor.Error("not-authorized");
    // }

    Messages.insert({
      messageText: message
      // createdAt: new Date(),
      // username: Meteor.user().username  // <-add real username
    });
  }
});


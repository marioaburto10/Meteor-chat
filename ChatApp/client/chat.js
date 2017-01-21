


var autoScrollingIsActive = false;
/* reactive var here */
scrollToBottom = function scrollToBottom (duration) {
  var messageWindow = $(".message-window");
  var scrollHeight = messageWindow.prop("scrollHeight");
  messageWindow.stop().animate({scrollTop: scrollHeight}, duration || 0);
};

// This code only runs on the client
Meteor.subscribe("messages", {
  onReady: function () {
      scrollToBottom();
      autoScrollingIsActive = true;
  }
});

  /* helper code */
  Template.body.helpers({
    recentMessages: function () {
      return Messages.find({}, {sort: {createdAt: 1}});
    }
    /* unread message helper */
  })

  /*chat window scrolling*/
   Template.message.onRendered(function () {
    if (autoScrollingIsActive) {
      scrollToBottom(250);
    } 
  }); 

   Template.message.onRendered(function () {
    if (autoScrollingIsActive) {
      scrollToBottom(250);
    } 
  });

  /*events*/
  Template.body.events({
    "submit .new-message": function(event) {
      var messageText = event.target.text.value;

      Meteor.call("sendMessage", messageText);
      scrollToBottom(250); // <--add this line

      event.target.text.value = "";
      event.preventDefault();
    },

    /* scroll event */
    "scroll .message-window": function () {
      var howClose = 80;  // # pixels leeway to be considered "at Bottom"
      var messageWindow = $(".message-window");
      var scrollHeight = messageWindow.prop("scrollHeight");
      var scrollBottom = messageWindow.prop("scrollTop") + messageWindow.height();
      var atBottom = scrollBottom > (scrollHeight - howClose);
      autoScrollingIsActive = atBottom ? true : false;
    },

  });
  
  /*account config*/ 
   // Keep this if you want it to ask for username instead of email
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

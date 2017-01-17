import {Template} from 'meteor/templating';

import './body.html';

Template.body.helpers({
  hello: 'Hi World'
})
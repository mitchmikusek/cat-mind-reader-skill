/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * Cat Mind Reader skill
 *
 * Simple skill outputting random generated text to mimic cat thoughts
 *
 * This supports multiple lauguages. (en-US, en-GB).
 * Based on example skill here: https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = "amzn1.ask.skill.be903ab7-e5e2-4a65-b982-6b339ee135c8";

const languageStrings = {
    'en-US': {
        translation: {
            THOUGHTS: [
              "I want tunt.",
              "I want tuna.",
              "I love Dad.",
              "I love Mom.",
              "I love Totoro.",
              "Fudge that thing in paticular.",
              "I think it is time for a cat nap."
            ],
            CAT_SOUNDS:[
              "",
              "Meow.",
              "Meow Meow.",
              "Mew.",
              "Mew Mew."
            ],
            SKILL_NAME: 'American Cat Thoughts',
            HELP_MESSAGE: 'You can say what\'s on kitty\'s mind, or, you can say exit... What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Goodbye!'
        }
    },
    'en-GB': {
      translation: {
        THOUGHTS: [
          "I want tunt.",
          "I want tuna.",
          "I love Dad.",
          "I love Mom.",
          "I love Totoro.",
          "Fudge that thing in paticular.",
          "I think it is time for a cat nap."
        ],
        CAT_SOUNDS:[
          "",
          "Meow.",
          "Meow Meow.",
          "Mew.",
          "Mew Mew."
        ],
        SKILL_NAME: 'British Cat Thoughts',
        HELP_MESSAGE: 'You can say What\'s on kitty\'s mind, or, you can say exit... What can I help you with?',
        HELP_REPROMPT: 'What can I help you with?',
        STOP_MESSAGE: 'Goodbye!'
        }
    }
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetThoughts');
    },
    'GetKittyThoughtIntent': function () {
        this.emit('GetThoughts');
    },
    'GetThoughts': function () {
        // Get a random Cat Thought from the Thoughts list
        // Use this.t() to get corresponding language data
        const thoughtsArr = this.t('THOUGHTS');
        const thoughtsIndex = Math.floor(Math.random() * thoughtsArr.length);
        const randomThought = thoughtsArr[thoughtsIndex];

        // Get a random pre and post Cat Sound from the Sounds list
        // Use this.t() to get corresponding language data
        const catSoundsArr = this.t('CAT_SOUNDS');
        const catPreSoundsIndex = Math.floor(Math.random() * catSoundsArr.length);
        const randomPreSound = catSoundsArr[catPreSoundsIndex];
        const catPostSoundsIndex = Math.floor(Math.random() * catSoundsArr.length);
        const randomPostSound = catSoundsArr[catPostSoundsIndex];

        // Create speech output
        const speechOutput = randomPreSound + ' ' + randomThought + ' ' + randomPostSound;
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomThought);
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

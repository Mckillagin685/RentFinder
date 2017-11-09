# Welcome to Slack-Pads repository
=======

This is the Git repository for the Slack app by the name of Slack-Pads.

## Link config file and brief set-up
------

### Setting up a slack app

Must be channel admin or similar access.

brief video walkthrough of setting up a slack app

[![Slack app tutorial](https://img.youtube.com/vi/watch?v=vSWj9nAhUiw&t=406s/0.jpg)](https://www.youtube.com/watch?v=vSWj9nAhUiw&t=406s)


### Config file and more

Look for ```slack-pads.config.js``` 

-- ``` deployUrl ``` is the base url you are deploying to. example: https://rent-finder.herokuapp.com/

--- ``` rentBotUrl ``` is the url to your bot in your slack channel. Must have set up a bot and an incoming webhook. see [incoming webhooks](https://api.slack.com/incoming-webhooks) and [bot-users](https://api.slack.com/bot-users) for more info

## Heroku deployment
------

### Requirements

Know how to use git --> [Git tutorial](http://product.hubspot.com/blog/git-and-github-tutorial-for-beginners)
Know how to use heroku --> [heroku deployment](https://devcenter.heroku.com/articles/deploying-nodejs)

### CLI Commands

```
heroku create $APP_NAME --buildpack https://github.com/mars/create-react-app-buildpack.git
git add .
git commit -m "Start with create-react-app"
git push heroku master
heroku open
```

## Future Implimentation 
------

Full Slack app distibution

Editing commands

Better user interface prompts such as adding more buttons for ease of usability


# <p align="center">Live-Chat</p>
##### <p align="center">Messaging web application developed using React TS, Firebase and Tailwind.</p>
###### <p align="center">Deployed at: https://live-chat-bde08.firebaseapp.com.</p>  
![](https://user-images.githubusercontent.com/56603839/222463742-902ebdb5-1f0e-4550-a67b-4d9fee5bbd27.png)

## Features
__`Real time`__ - Messages are updated in real time for everybody.  
__`Users authentication`__ - Users need to sign in. Auth state is managed in the context of the whole app.  
__`Concurrent accounts`__ - Chat handles any number of concurrent accounts.  
__`Multiple categories`__ - Each user may write different messages in each.  
__`Messages deletion`__ - Users may delete their own messages.  
__`Mail any sender`__ - Clicking on a user's name starts the action of sending him a mail through G-Mail.  
__`Nice to have`__ - Search categories bar, clear text button, auto scroll buttons.  
__`Custom pages`__ - Custom Loading, Error and NotFound pages.  

__`Dark theme`__ - Users may choose between light and dark theme. Choice is remembered between sessions. 
<p><img src="https://user-images.githubusercontent.com/56603839/222463807-e6f018c3-8a91-4d85-9731-82c8d562848a.png"></p>

__`Mobile ready`__ - Fully responsive UI which works well on any device.
| <img src="https://user-images.githubusercontent.com/56603839/222474049-9ba21d08-9007-4266-84d9-91e1deae30a6.jpg" width="250"> | <img src="https://user-images.githubusercontent.com/56603839/222473022-4018923b-b12e-474c-ae3b-0809898599c3.jpg" width="250"> | <img src="https://user-images.githubusercontent.com/56603839/222473029-5a3529d4-a4c4-428f-bdd1-8ff85a772fab.jpg" width="250"> |
| ------------- | ------------- | ------------- |

## Back-end's security
I'm using __Firebase__ for user's authentication, data storage(__Firestore - NoSQL DB__), and deployment.  
Firestore provides __rules__ for __accessing the data__ and __I've configured it__ as follows:
* `No data may be accessed` by an `unauthenticated` user.  
* `Categories` are `read-only` for all `authenticated` users. Only the admin may configure them.  
* `Messages` may be `created` and `deleted` only by the `specific authenticated` user who requested that(meaning, an authenticated user is `not capable` to create or delete messages `in the name of others`). Messages may be read by all authenticated users.  
![](https://user-images.githubusercontent.com/56603839/222740461-be504505-2039-4a9b-8c7c-990ff2807258.png)

## Tailwind, Dark Mode, CSS Selectors and Custom Scroll Bar
* Tailwind's `layers` were `extended` such as to have a small color palette and some base styling.  
* Dark mode is handled with a combination of Tailwind and `CSS variables` with `values set` by `CSS selectors`.  
* A `fancy scroll bar` was configured for `webkit` using _-webkit-scrollbar_.
<p align="center"><img src="https://user-images.githubusercontent.com/56603839/222751672-6e80fed7-1137-4bd9-a0a1-3386423b80c1.png"></p>

| <img src="https://user-images.githubusercontent.com/56603839/222753815-dd44bdcf-2413-422c-9e44-17b8981e2621.png" width="500"> | <img src="https://user-images.githubusercontent.com/56603839/222753867-43710cd4-49ae-4954-b71d-059b1707ea71.png" width="500"> |
| ------------- | ------------- |  

## Automatic CI/CD on GitHub
* Any `push` and `merged pull request` into the `main branch` will `automatically` trigger an `action` on GitHub which updates the deployed application at: https://live-chat-bde08.firebaseapp.com.

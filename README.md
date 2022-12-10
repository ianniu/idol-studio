# Idol Studio

by Yiheng Niu and Zhengtian Zhang

Many idols sing songs when they are streaming, primarily virtual idols. Here is a great way to
listen to your favorite idols' songs without viewing their stream recordings repeatedly! We
abstract the songs from streaming and make them available to you! You can search for
songs and add them to your own playlists! You can also play them in any order you like.

## Iteration 3

So far, Yiheng has implemented:

- Home screen
- Tab navigation
- Fetch songs from Firebase Storage
- Player which supports play, pause and play next song
- Redux integration to support global state management
- Player modal
- Play songs by order, loop a song, shuffle songs.
- Add songs to the playlist and delete songs from it
- Notification - reminding user to have a rest after 1 hour of listening
- Responsive CSS to adopt different phones

Zhengtian has implemented:

- Playlist screen
- Authentication with email
- Stack navigation between pages other than the home page
- Profile page, with camera use to take picture for user's avatar
- Playlist details page, where songs in the specific playlist shows
- Location - Integrated Google map to get the user's location
- External API - use OpenWeather API to get the weather based on user's location

Home page:



<img width="342" alt="Home" src="https://user-images.githubusercontent.com/53012771/206824222-de067606-3c0c-4399-a782-c99bf39faade.jpg">

Player modal:

<img width="342" alt="Playlist" src="https://user-images.githubusercontent.com/53012771/206824561-ea0f4d63-f6b4-4a17-87da-69347bcef266.jpg">

Home page with a song added to "My favorite" playlist.

<img width="342" alt="Playlist detail" src="https://user-images.githubusercontent.com/53012771/206824589-9034d574-0f90-4dc1-863a-dfd83bfc2d99.jpg">

Playlists page without login

<img width="342" alt="Playlist detail" src="https://user-images.githubusercontent.com/53012771/206824603-3424258c-e8a0-4e34-83fd-e20c351482f1.jpg">

Playlists page with login

<img width="342" alt="Playlist detail" src="https://user-images.githubusercontent.com/53012771/206824640-35df9396-4ca2-49ce-9a9f-3a3e61ff4f01.jpg">

Playlist detail page

<img width="342" alt="Playlist detail" src="https://user-images.githubusercontent.com/53012771/206824658-2ee819a3-6800-47bb-958c-d8efaf1d3469.jpg">

Profile

<img width="342" alt="Playlist detail" src="https://user-images.githubusercontent.com/53012771/206824673-76e1141a-4060-4524-809c-bb3a98226ddf.jpg">

Location and weather acquired and display in Profile page

<img width="342" alt="Playlist detail" src="https://user-images.githubusercontent.com/53012771/206824700-6c761197-31a8-430a-99da-8db429013b33.jpg">

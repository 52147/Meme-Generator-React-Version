# Meme Generator React

This is my meme generator project using React.

I found this project form a website that provided tutorials on building a meme generator. However, the [website](https://codingtorque.com/meme-generator-using-javascript/)'s implementation was based on vanilla JavaScript. So, I took on the task of transferring it to a React version.

During this project, I learned how to use the canvas element to draw images and text on the screen. One of the significant challenges I encountered was dealing with the CORS (Cross-Origin Resource Sharing) problem. This issue prevented me from downloading meme pictures when using image URLs.

To overcome this problem, I employed the CORS Anywhere proxy service. By utilizing this service, I was able to bypass the CORS restrictions by including the necessary CORS headers in the response. This allowed my application to retrieve the images without encountering the CORS problem.

Regarding the URLs, I use a header called "blob." This header be referring to the Blob object, commonly used to handle binary data like images.

However, while using the CORS Anywhere proxy service, I received advice from the ChatGPT suggesting that relying on third-party proxy services like CORS Anywhere can increase latency and create dependencies. Instead, it was recommended that I set up my own proxy server using cloud functions if I had the capability to do so. This approach would help reduce workload and eliminate the need for relying on third-party proxy services.

If you have any specific questions or need further assistance with my project, feel free to ask!

## Reference
- https://codingtorque.com/meme-generator-using-javascript/
- https://html.com/attributes/img-src%E3%84%A9
- https://github.com/Rob--W/cors-anywhere/issues/301
- https://react-bootstrap.netlify.app/docs/getting-started/introduction
- https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillText
- https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillText
- https://stackoverflow.com/questions/65287369/why-is-there-a-difference-between-width-and-actualboundingboxleft-actualbou

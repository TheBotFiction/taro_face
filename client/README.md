# Face
## How to start a new page
- Container component at `src/containers`
- Presentational component at `src/components`

Suppose we want to make the page `/posts/new`
```sh
mkdir -p src/{components,containers}/Post/New
touch src/{components,containers}/Post/New/{index,New}.js
```
```js
/* src/components/Post/New/New.js */
class New extends Component {
  render (
    return(<div></div>)
  )
}
/* src/components/Post/New/index.js */
import PostNewComponent from './New'

export default PostNewComponent
```
```js
/* src/containers/Post/New/NewContainer.js */
import PostNewComponent from 'components/Post/New'

class New extends Component {
  render (
    return(<PostNewComponent someProps={..someProps} />)
  )
}
/* src/containers/Post/New/index.js */
import PostNewContainer from './New'

export default PostNewContainer
```
then add a route to `src/index.js`

From now, we can develop the `/posts/new` UI without care about server data. When the API has done, just change `PostNewContainer` to use the API.
import { Button } from "@guang-comp/react-comp-lib"
import '@guang-comp/react-comp-lib/dist/index.css';

function App() {

  return <div>
    <Button type='primary' style={{marginRight: '20px'}}>按钮一</Button>
    <Button type='default' onClick={() => alert(1)}>按钮二</Button>
  </div>
}

export default App

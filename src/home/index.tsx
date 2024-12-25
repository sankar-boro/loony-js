import Navbar from './Navbar.tsx'
import { AppRouteProps } from 'loony-types'

const Home = (props: AppRouteProps) => {
  const { isMobile } = props

  return (
    <div className="home-container flex-row">
      {!isMobile ? <Navbar {...props} /> : null}
      <div
        style={{
          width: isMobile ? '100%' : '60%',
          paddingRight: isMobile ? '0%' : '5%',
          paddingLeft: isMobile ? '0%' : '5%',
        }}
      ></div>
    </div>
  )
}

export default Home

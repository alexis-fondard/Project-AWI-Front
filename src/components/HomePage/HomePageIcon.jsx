import '../../style/CommonToEveryWindow.css'

export default function HomePageIcon({src,alt,name}){


  return(
    <div className={'homepage_logo'}>
      <img src={src} alt={name}/>
      <h2 style={{"maxWidth":"10ch", "padding": "0px", "margin":"0px"}}>{name}</h2>
    </div>
  )
}
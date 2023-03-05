import '../../style/CommonToEveryWindow.css'

export default function LoginImage({src,alt,name}){


  return(
    <div className={'homepage_logo'}>
      <img src={src} alt={name}/>
      <h2>{name}</h2>
    </div>
  )
}
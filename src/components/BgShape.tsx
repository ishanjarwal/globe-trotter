const BgShape = ({top='auto', left='auto', right='auto',bottom='auto',height='250px',width='250px'}) => {
  return (
    <div className="blur-3xl aspect-square rounded-full absolute z-[-1] bg-[var(--bg-color)]" style={{height:height,width:width,top:top,bottom:bottom,left:left,right:right}}></div>
  )
}

export default BgShape
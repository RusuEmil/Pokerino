import "./Footer.scss";

function Footer() {
  return (
    <div className="footer">
      <div className="stoic">
        "In a world where everyone possesses the same knowledge, poker
        transforms into a contest dictated by fate and fortune." As Rustle said
        in the quote, you cannot control your luck, but you can control your
        chances, so this app is for training.
      </div>
      <div className="pokerpro">
        <img src={require("../../images/pokerpro.jpeg")} />
      </div>
    </div>
  );
}

export default Footer;

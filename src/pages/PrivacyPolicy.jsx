import HomeHeader from "../components/HomeHeader";
import styles from "./LegalNotice.module.css";
function PrivacyPolicy() {
  return (
    <>
      <HomeHeader />
      <div className={styles.legalNotice}>
      <header>Privacy Policy</header>

      <p>
        This privacy policy informs you about the nature, scope, and purpose of
        the collection and use of personal data on this website by the website
        operator:
      </p>

      <p>
        Dogan Celik
        <br />
        Therese-Giehse-Allee 91
        <br />
        81739 Munich, Germany
        <br />
        Email: mail@dogan-celik.com
      </p>

      <h2>1. Access Data</h2>
      <p>
        When you visit this website, the provider automatically collects and
        stores information in so-called server log files, which your browser
        transmits to us automatically. These are:
      </p>
      <ul>
        <li>Visited page</li>
        <li>Time of access</li>
        <li>Amount of data sent in bytes</li>
        <li>Source/reference from which you came to the page</li>
        <li>Browser used</li>
        <li>Operating system used</li>
        <li>IP address</li>
      </ul>
      <p>
        The collected data is used only for statistical analysis and to improve
        the website. However, the website operator reserves the right to check
        the server log files retrospectively if there is concrete evidence of
        illegal use.
      </p>

      <h2>2. Handling of Personal Data</h2>
      <p>
        The website operator only collects, uses, and discloses your personal
        data if this is permitted by law or if you consent to the data
        collection.
      </p>
      <p>
        Personal data includes all information that can be used to identify you
        and that can be traced back to you – for example, your name, email
        address, and telephone number.
      </p>

      <h2>3. Contact</h2>
      <p>
        If you contact the website operator using the contact options provided,
        your information will be stored so that it can be used to process and
        respond to your inquiry. This data will not be disclosed to third
        parties without your consent.
      </p>

      <h2>4. User Rights</h2>
      <p>
        You have the right to request, free of charge, information about the
        personal data stored about you. You also have the right to correct
        incorrect data and to block or delete your personal data, provided this
        does not conflict with any legal retention requirement.
      </p>

      <h2>5. SSL Encryption</h2>
      <p>
        To protect your data, this site uses SSL encryption. You can recognize
        an encrypted connection by the "https://" in the address bar of your
        browser and the lock symbol. Data you transmit to us cannot be read by
        third parties.
      </p>

      <h2>6. Changes to This Privacy Policy</h2>
      <p>
        The website operator reserves the right to update this privacy policy to
        comply with current legal requirements or to reflect changes to the
        website.
      </p>
      </div>
    </>
  );
}
export default PrivacyPolicy;

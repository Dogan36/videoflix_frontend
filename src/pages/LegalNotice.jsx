import HomeHeader from "../components/HomeHeader";
import styles from "./LegalNotice.module.css";
function LegalNotice() {
  return (
    <>
      <HomeHeader />
      <div className={styles.legalNotice}>
        <header>Legal Notice</header>

        <h2>Information according to § 5 TMG</h2>
        <p>
          Website Operator:
          <br />
          Dogan Celik
          <br />
          Therese-Giehse-Allee 91
          <br />
          81739 München
          <br />
          Germany
        </p>

        <p>
          Contact:
          <br />
          Phone: +49 176 388 30 388
          <br />
          Email: mail@dogan-celik.com
        </p>

        <p>
          Responsible for content according to § 55 Abs. 2 RStV:
          <br />
          Dogan Celik, same address as above
        </p>

        <p>
          Disclaimer:
          <br />
          Despite careful content control, we assume no liability for the
          content of external links. The operators of the linked pages are
          solely responsible for their content.
        </p>
      </div>
    </>
  );
}

export default LegalNotice;

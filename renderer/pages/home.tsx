import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

export const Home = () => {
  const { t } = useTranslation("home");
  const router = useRouter();
  const handleLocaleChange = (event) => {
    const value = event.target.value;

    router.push(router.route, router.asPath, {
      locale: value,
    });
  };
  return (
    <>
      <select onChange={handleLocaleChange} value={router.locale}>
        <option value="en">English</option>
        <option value="fr">French</option>
      </select>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p>
          {t("currency", {
            val: 200.0,
            style: "currency",
            currency: "EUR",
          })}
        </p>

        <p>
          {t("number", {
            val: 200.03,
          })}
        </p>
        <p>
          {t("dateTime", {
            val: new Date(1234567890123),
            formatParams: {
              val: {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              },
            },
          })}
        </p>

        <h1>
          {router.locale} : {t("home")}
        </h1>
      </div>
    </>
  );
};

export default Home;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["home"])),
  },
});

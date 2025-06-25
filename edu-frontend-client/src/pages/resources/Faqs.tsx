import { Box, Grid, Typography } from "@mui/material";
import QueriesAccordion from "../../components/plans-pricing-components/QueriesAccordion";
import faqPersonImage from "../../assets/plans-pricing/faqPersonImage.png";

const Faqs = () => {
  const faqAccordionItems = [
    {
      id: 1,
      title: "What is Edumaat and how can it help our school or college?",
      content:
        "Edumaat is a software that helps manage school or college work like attendance, exams, fees, and more. It saves time and makes everything easier and faster.",
      points: [],
      subTitle: "",
    },
    {
      id: 2,
      title: "Can we change Edumaat to match how our school works?",
      content:
        "Yes, Edumaat can be changed to fit your school’s rules and way of working.",
      points: [],
      subTitle: "",
    },
    {
      id: 3,
      title: "Is our data safe in Edumaat?",
      content:
        "Yes, your data is safe. Edumaat uses strong security to keep your information private and protected.",
      points: [],
      subTitle: "",
    },
    {
      id: 4,
      title:
        "Can Edumaat work with other systems like fingerprint attendance or online payments?",
      content:
        "Yes, Edumaat can connect with systems like fingerprint machines, online payment apps, and more.",
      points: [],
      subTitle: "",
    },
    {
      id: 5,
      title: "Will we get help in using Edumaat?",
      content:
        "Yes, Edumaat gives full training and support to help you and your team use the system easily.",
      points: [],
      subTitle: "",
    },
  ];

  return (
    <Box>
      <title>FAQs – Edumaat | Your Questions Answered</title>
      <meta
        name="description"
        content="Find answers to frequently asked questions about Edumaat's features, security, customization, and support. Learn how Edumaat can benefit your institution."
      />
      <meta
        name="keywords"
        content="Edumaat FAQs, school ERP questions, education software help, Edumaat support, Edumaat integration, data security Edumaat"
      />
      <meta name="author" content="Edumaat" />

      <Box sx={{ px: { xs: 1, md: 11 }, mt: { xs: 10, sm: 18 }, mb: 10 }}>
        <Box sx={{ textAlign: "center" }}>
          <Box sx={{ px: { lg: 14, sm: 4, xs: 2 }, my: 8 }}>
            <Grid container>
              <Grid size={4} sx={{ display: { xs: "none", sm: "block" } }}>
                <Box
                  component={"img"}
                  src={faqPersonImage}
                  alt="essentialPlanFeaturedImage"
                  width={"100%"}
                  height={"100%"}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 8 }}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 700, textAlign: "right", mb: 4 }}
                >
                  FAQ
                </Typography>

                <QueriesAccordion
                  accordionItems={faqAccordionItems}
                  bgColor="#fff"
                  isShadowed={true}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Faqs;

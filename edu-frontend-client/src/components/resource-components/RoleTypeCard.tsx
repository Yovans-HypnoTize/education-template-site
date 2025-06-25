import { Box, Grid, Typography } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useNavigate } from "react-router-dom";

const RoleTypeCard = ({ cardItems }: any) => {
  const navigate = useNavigate();
  return (
    <>
      <Grid container spacing={{ sm: 6, xs: 2 }}>
        {cardItems.map((card: any) => (
          <Grid
            size={12}
            sx={{
              transition: "all 0.3s ease-in-out",
              p: 3,
              borderRadius: 3,
              "&:hover": {
                bgcolor: "#f2f2f2",
                transform: "scale(1.03)",
                boxShadow: 3,
              },
              bgcolor:{xs:"#f2f2f2",sm:"inherit"},
              cursor: "pointer",
            }}
            onClick={() => {
              navigate(card.id);
            }}
          >
            <Grid container spacing={6}>
              <Grid size={{xs:12,sm:6}}>
                <Box
                  component={"img"}
                  src={card.img}
                  alt={`${card.img}_${card.id}`}
                  style={{ width: "100%", height: "100%", borderRadius:4 }}
                />
              </Grid>
              <Grid size={{xs:12, sm:6}}>
                <Box>
                  <Typography sx={{ color: "#707070", pb: 1 }}>
                    {card.date}
                  </Typography>
                  <Typography sx={{ pb: 2, fontWeight: 700 }}>
                    {card.title}
                  </Typography>
                  <Typography sx={{ pb: 2 }}>
                    {card.content.length > 80
                      ? `${card.content.slice(0, 80)}...`
                      : card.content}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      "&:hover": {
                        color: "#1D70BC",
                        fontWeight: 700,
                        cursor: "pointer",
                      },
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(card.id);
                    }}
                  >
                    <Box component={"span"}>Read More</Box>
                    <ArrowRightAltIcon sx={{ ml: 0.5, mt: 0.2 }} />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default RoleTypeCard;

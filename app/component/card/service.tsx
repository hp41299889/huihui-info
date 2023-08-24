import {
  Button,
  Card,
  CardActions,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import Link from "next/link";

interface Props {
  title: string;
  contents: string[];
  seeExampleLink: string;
}

const ServiceCard = (props: Props) => {
  const { title, contents, seeExampleLink } = props;
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <List disablePadding sx={{ paddingLeft: "22px" }}>
          {contents.map((c) => (
            <ListItem
              key={c}
              disablePadding
              sx={{ display: "list-item", listStyleType: "initial" }}
            >
              <ListItemText primary={c} />
            </ListItem>
          ))}
        </List>
      </CardContent>
      <CardActions>
        <Link href={seeExampleLink}>
          <Button>查看範例</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default ServiceCard;

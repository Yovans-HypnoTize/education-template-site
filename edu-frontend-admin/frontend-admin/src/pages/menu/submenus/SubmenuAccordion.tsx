import { useState } from "react";
import {
  MenuItem,
  List,
  ListItemText,
  Collapse,
  TextField,
  Paper,
  Divider,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Checkbox } from "@mui/material";

import { sampleMenuData } from "../../../utils/Constants";

const RenderFields = ({ fields }: { fields: any[] }) => (
  <div className="p-4 bg-white rounded-md mr-4 shadow">
    {fields.map((field) => (
      <TextField
        key={field.name}
        label={field.label}
        type={field.type}
        placeholder={field.placeholder}
        fullWidth
        sx={{ mb: 1 }}
        size="small"
      />
    ))}
  </div>
);

const SubmenuAccordion = () => {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const handleToggle = (id: string) => {
    setOpenMenus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderMenuItem = (item: any) => {
    const isOpen = !!openMenus[item.id];
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.id}>
        <MenuItem
          onClick={() => handleToggle(item.id)}
          sx={{
            bgcolor: isOpen ? "#EDF2FF" : "inherit",
            color: isOpen ? "#000" : "inherit",
            "&:hover": {
              bgcolor: isOpen ? "#EDF2FF" : "#EDF2FF",
              borderRadius: 1,
            },
            py: 3.5,
          }}
          className="flex justify-between items-center h-12 border-1 border-gray-300"
        >
          <div className="flex items-center gap-2 w-full">
            <Checkbox
              checked={!!checkedItems[item.id]}
              onChange={(e) => {
                e.stopPropagation();
                setCheckedItems((prev) => ({
                  ...prev,
                  [item.id]: e.target.checked,
                }));
              }}
              onClick={(e) => e.stopPropagation()}
            />
            <ListItemText primary={item.title} />
          </div>

          {hasChildren ? (
            isOpen ? (
              <ArrowDropUpIcon />
            ) : (
              <ArrowDropDownIcon />
            )
          ) : null}
        </MenuItem>
        <Divider style={{ margin: "0px 25px" }} />

        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          {hasChildren ? (
            <div className="ml-4">
              {item.children.map((child: any) => (
                <div key={child.id}>
                  <MenuItem
                    onClick={() => handleToggle(child.id)}
                    sx={{
                      bgcolor: openMenus[child.id] ? "#F9FBFF" : "inherit",
                      color: openMenus[child.id] ? "#000" : "inherit",
                      "&:hover": {
                        bgcolor: openMenus[child.id] ? "#F9FBFF" : "#F9FBFF",
                      },
                    }}
                    className="flex justify-between items-center pl-6"
                  >
                    <ListItemText primary={child.title} />
                    {child.fields ? (
                      openMenus[child.id] ? (
                        <ArrowDropUpIcon />
                      ) : (
                        <ArrowDropDownIcon />
                      )
                    ) : null}
                  </MenuItem>

                  <Collapse
                    in={openMenus[child.id]}
                    timeout="auto"
                    unmountOnExit
                  >
                    {child.fields && <RenderFields fields={child.fields} />}
                  </Collapse>
                </div>
              ))}
            </div>
          ) : (
            item.fields && <RenderFields fields={item.fields} />
          )}
        </Collapse>
      </div>
    );
  };

  return (
    <Paper
      sx={{ width: "100%", overflow: "scroll", borderRadius: 3, height: 520 }}
      className="border-1 border-gray-200"
    >
      <List className="w-full" sx={{ p: 0 }}>
        {sampleMenuData.map(renderMenuItem)}
      </List>
    </Paper>
  );
};

export default SubmenuAccordion;

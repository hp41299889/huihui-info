"use client";
import { useState, ComponentType } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  IconButton,
  Stack,
  Box,
  Typography,
  Tooltip,
} from "@mui/material";
import { Add, Delete, Edit, Visibility } from "@mui/icons-material";

import { TableDatas, TableMetadata } from "./interface";
import {
  FormProps,
  FormType,
} from "../../form/client-order-management/interface";
import { FormData } from "../../form/interface";

interface DataKey {
  [key: string]: any;
}

interface Props<T> {
  title: string;
  metadata: TableMetadata<T>[];
  datas: TableDatas<T>;
  Form: ComponentType<FormProps<T>>;
  afterAction: () => Promise<void>;
  fields?: {
    [key: string]: any[];
  };
}

const ManagementTable = <T extends DataKey>(props: Props<T>) => {
  const { title, metadata, datas, Form, afterAction, fields } = props;
  const [selected, setSelected] = useState<FormData<T>>(null);
  const [formType, setFormType] = useState<FormType>("create");
  const [formModal, setFormModal] = useState<boolean>(false);

  const onClose = () => {
    setFormModal(false);
    setSelected(null);
  };

  const onNew = () => {
    setFormType("create");
    setSelected(null);
    setFormModal(true);
  };

  const onWatch = (d: FormData<T>) => {
    setFormType("watch");
    setSelected(d);
    setFormModal(true);
  };

  const onEdit = (d: FormData<T>) => {
    setFormType("edit");
    setSelected(d);
    setFormModal(true);
  };

  const onDelete = (d: FormData<T>) => {
    setFormType("delete");
    setSelected(d);
    setFormModal(true);
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between">
        <Typography>{title}</Typography>
        <Stack direction="row">
          <Tooltip title="新增">
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => onNew()}
            >
              新增
            </Button>
          </Tooltip>
        </Stack>
      </Stack>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              {metadata.map((m, i) => (
                <TableCell
                  key={m.label}
                  sx={{ width: m.width ? m.width : "auto" }}
                >
                  {m.label}{" "}
                </TableCell>
              ))}
              <TableCell sx={{ width: "150px" }}>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datas?.map((d, i) => (
              <TableRow key={`${title}_${i}`}>
                {metadata.map((m, i) => (
                  <TableCell key={`${m.key}`}>
                    {m.preProcess ? m.preProcess(d) : d[m.key]}
                  </TableCell>
                ))}
                <TableCell>
                  <Stack direction="row">
                    <Tooltip title="查看" onClick={() => onWatch(d)}>
                      <IconButton>
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="編輯">
                      <IconButton onClick={() => onEdit(d)}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="刪除">
                      <IconButton onClick={() => onDelete(d)}>
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Form
        open={formModal}
        type={formType}
        data={selected}
        onClose={onClose}
        fields={fields}
        afterAction={afterAction}
      />
    </Box>
  );
};

export default ManagementTable;

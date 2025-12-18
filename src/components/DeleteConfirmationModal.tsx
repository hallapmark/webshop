import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { useImperativeHandle, useState } from "react";
import type { Product } from "../models/Product";

interface DeleteConfirmationModalInterface {
  onConfirm: (id: number) => void,
  ref: any
}

export interface DeleteConfirmationModalType {
  askConfirmProductDelete: (product: Product) => void
}

function DeleteConfirmationModal(props: DeleteConfirmationModalInterface) {
  const [confirmMenuOpen, setConfirmMenuOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  useImperativeHandle(props.ref, () => {
    return {
      askConfirmProductDelete (product: Product) {
        setProductToDelete(product);
        setConfirmMenuOpen(true);
      }
    } 
  }, []);

  const handleConfirmDelete = () => {
    if (!productToDelete) return;
    props.onConfirm(productToDelete.id);
    setConfirmMenuOpen(false);
    setProductToDelete(null);
  };

  const handleCancelDelete = () => {
    setConfirmMenuOpen(false);
    setProductToDelete(null);
  };

  return (
    <Dialog
        open={confirmMenuOpen}
        onClose={handleCancelDelete}
        aria-describedby="delete-product-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="delete-product-dialog-description">
            Delete product "{productToDelete?.name}?"
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCancelDelete}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleConfirmDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
  )
}
export default DeleteConfirmationModal
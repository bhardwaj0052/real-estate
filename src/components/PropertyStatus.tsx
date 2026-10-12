import { useState } from "react";
import { Button, Stack, TextField } from "@mui/material";
import type { Property } from "../types/property";
import { updateStatus } from "../service/propertyServices";
import PropertyCard from "./propertyCard";

interface Props {
  property: Property;
  onUpdated?: () => void;
}

export default function PropertyStatus({ property, onUpdated }: Props) {
  const [show, setShow] = useState(false);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const isPending = property.status === "PENDING";

  const closeReject = () => {
    setReason("");
    setShow(false);
  };

  const handleAction = async (status: "APPROVED" | "REJECTED") => {
    const rejectionReason = reason.trim();
    if (status === "REJECTED" && !rejectionReason) {
      return;
    }

    setLoading(true);
    try {
      if (status === "APPROVED") {
        await updateStatus({ id: property.id, status });
      } else {
        await updateStatus({ id: property.id, status, rejectionReason });
        closeReject();
      }
      onUpdated?.();
    } catch {
      alert("Unable to update status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PropertyCard property={property}>
      {isPending && (
        <Stack spacing={1}>
          <Stack direction="row" spacing={1}>
            <Button
              fullWidth
              variant="contained"
              color="success"
              disabled={loading}
              onClick={() => handleAction("APPROVED")}
            >
              Approve
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="error"
              disabled={loading}
              onClick={() => setShow(true)}
            >
              Reject
            </Button>
          </Stack>

          {show && (
            <Stack spacing={1}>
              <TextField
                label="Reject reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                multiline
                minRows={2}
                required
                fullWidth
              />
              <Stack direction="row" spacing={1}>
                <Button fullWidth onClick={closeReject}>
                  Close
                </Button>
                <Button
                  fullWidth
                  color="error"
                  variant="contained"
                  disabled={loading || !reason.trim()}
                  onClick={() => handleAction("REJECTED")}
                >
                  Update
                </Button>
              </Stack>
            </Stack>
          )}
        </Stack>
      )}
    </PropertyCard>
  );
}
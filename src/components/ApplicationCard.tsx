"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Mail, Phone, Eye } from "lucide-react";

export interface Application {
  id: string;
  applicantName: string;
  email: string;
  phone: string;
  purchaseOption: "financing" | "outright";
  status: "submitted" | "under_review" | "approved" | "rejected";
  submittedAt: string;
  monthlyIncome: number;
}

interface ApplicationCardProps {
  application: Application;
  onViewDetails: (id: string) => void;
  onUpdateStatus: (id: string, status: Application["status"]) => void;
}

const statusConfig = {
  submitted: { label: "Submitted", className: "bg-blue-500/10 text-blue-700 dark:text-blue-400" },
  under_review: { label: "Under Review", className: "bg-amber-500/10 text-amber-700 dark:text-amber-400" },
  approved: { label: "Approved", className: "bg-primary/10 text-primary" },
  rejected: { label: "Rejected", className: "bg-destructive/10 text-destructive" },
};

export default function ApplicationCard({ application, onViewDetails, onUpdateStatus }: ApplicationCardProps) {
  const statusInfo = statusConfig[application.status];

  return (
    <Card className="p-6 hover-elevate" data-testid={`card-application-${application.id}`}>
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
        <div>
          <h3 className="font-semibold text-lg mb-1" data-testid={`text-name-${application.id}`}>
            {application.applicantName}
          </h3>
          <Badge className={statusInfo.className} data-testid={`badge-status-${application.id}`}>
            {statusInfo.label}
          </Badge>
        </div>
        <Badge variant="outline" data-testid={`badge-option-${application.id}`}>
          {application.purchaseOption === "financing" ? "Financing" : "Outright Purchase"}
        </Badge>
      </div>

      <div className="space-y-2 text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4" />
          <span data-testid={`text-email-${application.id}`}>{application.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4" />
          <span data-testid={`text-phone-${application.id}`}>{application.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span data-testid={`text-date-${application.id}`}>
            {new Date(application.submittedAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(application.id)}
          className="gap-2"
          data-testid={`button-view-${application.id}`}
        >
          <Eye className="w-4 h-4" />
          View Details
        </Button>
        
        {application.status === "submitted" && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onUpdateStatus(application.id, "under_review")}
            data-testid={`button-review-${application.id}`}
          >
            Start Review
          </Button>
        )}
        
        {application.status === "under_review" && (
          <>
            <Button
              variant="default"
              size="sm"
              onClick={() => onUpdateStatus(application.id, "approved")}
              data-testid={`button-approve-${application.id}`}
            >
              Approve
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onUpdateStatus(application.id, "rejected")}
              data-testid={`button-reject-${application.id}`}
            >
              Reject
            </Button>
          </>
        )}
      </div>
    </Card>
  );
}

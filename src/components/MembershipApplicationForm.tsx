"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const applicationSchema = z.object({
  fullName: z.string().min(2, "Full name required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Invalid phone number"),
  dateOfBirth: z.string().min(1, "Date of birth required"),
  gender: z.enum(["male", "female", "other"]),
  address: z.string().min(10, "Full address required"),
  city: z.string().min(2, "City required"),
  state: z.string().min(2, "State required"),
  employmentStatus: z.enum(["employed", "self-employed", "business-owner", "unemployed"]),
  employerName: z.string().optional(),
  jobTitle: z.string().optional(),
  occupation: z.string().min(2, "Occupation required"),
  monthlyIncome: z.string().min(1, "Monthly income required"),
  howDidYouHear: z.string().min(1, "Please select how you heard about us"),
  wantsFinancing: z.boolean().default(false),
  bvn: z.string().optional(),
  whyJoinFarmChain: z.string().min(50, "Please write at least 50 characters").max(500, "Maximum 500 characters"),
  govtIdType: z.enum(["nin", "drivers-license", "voters-card", "passport"]),
  govtIdNumber: z.string().min(5, "ID number required"),
  nextOfKinName: z.string().min(2, "Next of kin name required"),
  nextOfKinPhone: z.string().min(10, "Next of kin phone required"),
  bankName: z.string().optional(),
  accountNumber: z.string().optional(),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

interface MembershipApplicationFormProps {
  currentStep: number;
  onSubmit: (data: Partial<ApplicationFormData>) => void;
  onSave: (data: Partial<ApplicationFormData>) => void;
  defaultValues?: Partial<ApplicationFormData>;
}

export default function MembershipApplicationForm({
  currentStep,
  onSubmit,
  onSave,
  defaultValues,
}: MembershipApplicationFormProps) {
  const form = useForm<Partial<ApplicationFormData>>({
    resolver: zodResolver(applicationSchema.partial()),
    defaultValues: defaultValues || {},
  });

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} data-testid="input-fullname" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" {...field} data-testid="input-email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <Input placeholder="+2348012345678" {...field} data-testid="input-phone" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} data-testid="input-dob" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-gender">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Home Address *</FormLabel>
                    <FormControl>
                      <Textarea placeholder="123 Main Street, Area" {...field} data-testid="input-address" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City *</FormLabel>
                    <FormControl>
                      <Input placeholder="Lagos" {...field} data-testid="input-city" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State *</FormLabel>
                    <FormControl>
                      <Input placeholder="Lagos State" {...field} data-testid="input-state" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        );

      case 2:
        return (
          <>
            <h3 className="text-xl font-semibold mb-4">Employment & Background</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="employmentStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employment Status *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-employment-status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="employed">Salaried Employee</SelectItem>
                        <SelectItem value="self-employed">Self-Employed</SelectItem>
                        <SelectItem value="business-owner">Business Owner</SelectItem>
                        <SelectItem value="unemployed">Unemployed</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="employerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company/Business Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Company Name" {...field} data-testid="input-employer" />
                    </FormControl>
                    <FormDescription>If applicable</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Manager" {...field} data-testid="input-job-title" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="occupation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Occupation *</FormLabel>
                    <FormControl>
                      <Input placeholder="Farmer, Engineer, Trader" {...field} data-testid="input-occupation" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="monthlyIncome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Income (₦) *</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="200000" {...field} data-testid="input-income" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="howDidYouHear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How did you hear about us? *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-how-hear">
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="social-media">Social Media</SelectItem>
                        <SelectItem value="friend">Friend/Referral</SelectItem>
                        <SelectItem value="radio">Radio</SelectItem>
                        <SelectItem value="event">Event/Workshop</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="whyJoinFarmChain"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Why do you want to join FarmChain? *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="In 50-150 words, tell us why you want to join..." 
                        className="min-h-32"
                        {...field} 
                        data-testid="input-why-join" 
                      />
                    </FormControl>
                    <FormDescription>
                      {field.value?.length || 0} / 500 characters (minimum 50)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        );

      case 3:
        return (
          <>
            <h3 className="text-xl font-semibold mb-4">Verification & Next of Kin</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="wantsFinancing"
                render={({ field }) => (
                  <FormItem className="md:col-span-2 flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="h-4 w-4 mt-1"
                        data-testid="checkbox-financing"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Yes, I want zero-interest cattle finance (requires BVN)
                      </FormLabel>
                      <FormDescription>
                        ₦50,000/month for 12 months. You own the cow from Day 1.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              {form.watch("wantsFinancing") && (
                <FormField
                  control={form.control}
                  name="bvn"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Bank Verification Number (BVN) *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="12345678901" 
                          maxLength={11}
                          type="password"
                          {...field} 
                          data-testid="input-bvn" 
                        />
                      </FormControl>
                      <FormDescription>11-digit BVN (encrypted & secure)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="govtIdType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Government ID Type *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-id-type">
                          <SelectValue placeholder="Select ID type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="nin">NIN</SelectItem>
                        <SelectItem value="drivers-license">Driver&apos;s License</SelectItem>
                        <SelectItem value="voters-card">Voter&apos;s Card</SelectItem>
                        <SelectItem value="passport">International Passport</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="govtIdNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID Number *</FormLabel>
                    <FormControl>
                      <Input placeholder="ID number" {...field} data-testid="input-id-number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nextOfKinName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Next of Kin Full Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} data-testid="input-nok-name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nextOfKinPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Next of Kin Phone *</FormLabel>
                    <FormControl>
                      <Input placeholder="+2348012345678" {...field} data-testid="input-nok-phone" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="p-6 md:p-8 max-w-4xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {renderStep()}

          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => onSave(form.getValues())}
              data-testid="button-save-later"
            >
              Save & Continue Later
            </Button>
            <Button
              type="submit"
              className="sm:ml-auto"
              data-testid="button-next-step"
            >
              {currentStep === 3 ? "Lock My Cow & NFT" : "Next Step"}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}

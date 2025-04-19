import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { CheckCircle, Crown, PiggyBank, Mountain } from "lucide-react";
import {Button, Input, TextField, , InputLabel} from '@mui/material'
import { Range } from "@/components/ui/range";

interface PreferencesFormProps {
  onSubmitSuccess: (data: any) => void;
}

export function PreferencesForm({ onSubmitSuccess }: PreferencesFormProps) {
  const { toast } = useToast();
  const [budgetValue, setBudgetValue] = useState(2000);

  const form = useForm<TravelPreferenceFormValues>({
    resolver: zodResolver(travelPreferenceFormSchema),
    defaultValues: {
      destination: "",
      duration: 5,
      travelStyles: [],
      interests: [],
      budget: 2000,
      additionalInfo: ""
    }
  });

  const generateRecommendation = useMutation({
    mutationFn: async (data: TravelPreferenceFormValues) => {
      const response = await apiRequest("POST", "/api/recommendations", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Recommendations generated!",
        description: "Your personalized travel plan is ready.",
      });
      onSubmitSuccess(data);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to generate recommendations: ${error.message}`,
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: TravelPreferenceFormValues) => {
    generateRecommendation.mutate(data);
  };

  const travelStyles = [
    { id: "luxury", label: "Luxury", icon: <Crown className="h-5 w-5" /> },
    { id: "budget", label: "Budget", icon: <PiggyBank className="h-5 w-5" /> },
    { id: "adventure", label: "Adventure", icon: <Mountain className="h-5 w-5" /> }
  ];

  const interests = [
    { id: "culture", label: "Culture & History" },
    { id: "food", label: "Food & Dining" },
    { id: "nature", label: "Nature & Outdoors" },
    { id: "shopping", label: "Shopping" },
    { id: "relaxation", label: "Relaxation" }
  ];

  const handleBudgetChange = (value: number[]) => {
    setBudgetValue(value[0]);
    form.setValue("budget", value[0], { shouldValidate: true });
  };

  return (
    <section id="preferences" className="py-16 bg-neutral-200">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 bg-primary p-6 text-white">
              <h2 className="text-2xl font-bold mb-4">Your Travel Preferences</h2>
              <p className="mb-6">Tell us what you're looking for and our AI will create your perfect itinerary</p>
              
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-amber-400" />
                  <span>Personalized recommendations</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-amber-400" />
                  <span>Budget estimates</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-amber-400" />
                  <span>Insider travel tips</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-amber-400" />
                  <span>Save preferences for future trips</span>
                </li>
              </ul>
            </div>
            
            <div className="md:w-2/3 p-6">
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <Label htmlFor="destination">Destination</Label>
                    <Input
                      id="destination"
                      placeholder="City, Country, or Region"
                      {...form.register("destination")}
                    />
                    {form.formState.errors.destination && (
                      <p className="mt-1 text-sm text-red-500">{form.formState.errors.destination.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="duration">Trip Duration</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="duration"
                        type="number"
                        min={1}
                        max={30}
                        placeholder="Number of days"
                        {...form.register("duration", { valueAsNumber: true })}
                      />
                      <span className="text-gray-500">days</span>
                    </div>
                    {form.formState.errors.duration && (
                      <p className="mt-1 text-sm text-red-500">{form.formState.errors.duration.message}</p>
                    )}
                  </div>
                </div>
                
                <div className="mb-6">
                  <Label>Travel Style</Label>
                  <div className="grid grid-cols-3 gap-2 mt-1">
                    <Controller
                      control={form.control}
                      name="travelStyles"
                      render={({ field }) => (
                        <>
                          {travelStyles.map((style) => {
                            const isSelected = field.value.includes(style.id);
                            return (
                              <div key={style.id} className="relative">
                                <input
                                  type="checkbox"
                                  id={`style-${style.id}`}
                                  className="peer sr-only"
                                  checked={isSelected}
                                  onChange={(e) => {
                                    const newValue = [...field.value];
                                    if (e.target.checked) {
                                      if (!newValue.includes(style.id)) {
                                        newValue.push(style.id);
                                      }
                                    } else {
                                      const index = newValue.indexOf(style.id);
                                      if (index !== -1) {
                                        newValue.splice(index, 1);
                                      }
                                    }
                                    field.onChange(newValue);
                                  }}
                                />
                                <label
                                  htmlFor={`style-${style.id}`}
                                  className={`flex flex-col items-center p-2 text-center border rounded-md cursor-pointer transition-all 
                                    ${isSelected 
                                      ? 'border-primary bg-primary bg-opacity-10' 
                                      : 'border-gray-300'
                                    }`}
                                >
                                  {style.icon}
                                  <span className="text-sm mt-1">{style.label}</span>
                                </label>
                              </div>
                            );
                          })}
                        </>
                      )}
                    />
                  </div>
                  {form.formState.errors.travelStyles && (
                    <p className="mt-1 text-sm text-red-500">{form.formState.errors.travelStyles.message}</p>
                  )}
                </div>
                
                <div className="mb-6">
                  <Label>Interests</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <Controller
                      control={form.control}
                      name="interests"
                      render={({ field }) => (
                        <>
                          {interests.map((interest) => {
                            const isSelected = field.value.includes(interest.id);
                            return (
                              <div key={interest.id} className="relative">
                                <input
                                  type="checkbox"
                                  id={`interest-${interest.id}`}
                                  className="peer sr-only"
                                  checked={isSelected}
                                  onChange={(e) => {
                                    const newValue = [...field.value];
                                    if (e.target.checked) {
                                      if (!newValue.includes(interest.id)) {
                                        newValue.push(interest.id);
                                      }
                                    } else {
                                      const index = newValue.indexOf(interest.id);
                                      if (index !== -1) {
                                        newValue.splice(index, 1);
                                      }
                                    }
                                    field.onChange(newValue);
                                  }}
                                />
                                <label
                                  htmlFor={`interest-${interest.id}`}
                                  className={`block px-3 py-1 border rounded-full text-sm cursor-pointer transition-all
                                    ${isSelected 
                                      ? 'border-primary bg-primary text-white' 
                                      : 'border-gray-300'
                                    }`}
                                >
                                  {interest.label}
                                </label>
                              </div>
                            );
                          })}
                        </>
                      )}
                    />
                  </div>
                  {form.formState.errors.interests && (
                    <p className="mt-1 text-sm text-red-500">{form.formState.errors.interests.message}</p>
                  )}
                </div>
                
                <div className="mb-6">
                  <Label htmlFor="budget">Budget Range</Label>
                  <div className="flex items-center mt-2">
                    <span className="text-gray-700 mr-2">$</span>
                    <Controller
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <Range
                          value={[field.value]}
                          min={100}
                          max={10000}
                          step={100}
                          onValueChange={handleBudgetChange}
                          className="w-full"
                        />
                      )}
                    />
                    <span className="text-gray-700 ml-2 w-16" id="budget-value">
                      ${budgetValue.toLocaleString()}
                    </span>
                  </div>
                  {form.formState.errors.budget && (
                    <p className="mt-1 text-sm text-red-500">{form.formState.errors.budget.message}</p>
                  )}
                </div>
                
                <div className="mb-6">
                  <Label htmlFor="additionalInfo">Additional Preferences</Label>
                  <Textarea
                    id="additionalInfo"
                    rows={3}
                    placeholder="Tell us more about what you're looking for..."
                    {...form.register("additionalInfo")}
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    className="inline-flex items-center"
                    disabled={generateRecommendation.isPending}
                  >
                    <span>Generate Recommendations</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 1.944A11.955 11.955 0 012 10a11.955 11.955 0 018 8.056A11.955 11.955 0 0118 10a11.955 11.955 0 01-8-8.056zM10 3a7 7 0 100 14 7 7 0 000-14z" clipRule="evenodd" />
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

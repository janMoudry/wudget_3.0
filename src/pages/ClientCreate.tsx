import { useState } from "react";
import { Button, TextField, Typography, Paper, Select } from "../components";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../navigation/ROUTES";
import { UserPlus, Save, X, ChevronRight, ChevronLeft } from "lucide-react";
import { useCreateClient } from "../api/createClient";
import { toast } from "react-toastify";

type FormStep = 1 | 2 | 3 | 4 | 5;

const ClientCreate = () => {
  const navigate = useNavigate();
  const createClient = useCreateClient();
  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  
  const [formData, setFormData] = useState({
    // Basic Info
    name: "",
    birthYear: new Date().getFullYear() - 30,
    maritalStatus: "single",
    children: 0,
    housing: "own",
    occupation: "",
    incomeType: "stable",

    // Financial Goals
    shortTermGoals: [] as string[],
    shortTermGoalsOther: "",
    longTermGoals: [] as string[],
    longTermGoalsOther: "",
    priority: "save",

    // Financial Behavior
    trackingMethod: "manual",
    hasCredit: false,
    hasOverdraft: false,
    hasInvestments: false,
    hasSubscriptions: false,
    monthlyBalance: "surplus",

    // Account Setup
    createFirstAccount: true,
    monthlyBudget: "",
    firstStatementDate: "",
    expenseCategories: [] as string[],

    // Notes
    notes: "",
  });

  const handleSave = async () => {
    try {
      await createClient.mutateAsync({
        name: formData.name,
        notes: `
Základní informace:
- Rok narození: ${formData.birthYear}
- Rodinný stav: ${formData.maritalStatus}
- Počet dětí: ${formData.children}
- Bydlení: ${formData.housing}
- Zaměstnání: ${formData.occupation}
- Typ příjmu: ${formData.incomeType}

Finanční cíle:
Krátkodobé: ${formData.shortTermGoals.join(", ")}${formData.shortTermGoalsOther ? ` (Jiné: ${formData.shortTermGoalsOther})` : ""}
Dlouhodobé: ${formData.longTermGoals.join(", ")}${formData.longTermGoalsOther ? ` (Jiné: ${formData.longTermGoalsOther})` : ""}
Priorita: ${formData.priority}

Finanční chování:
- Sledování financí: ${formData.trackingMethod}
- Kreditní karty: ${formData.hasCredit ? "Ano" : "Ne"}
- Kontokorent: ${formData.hasOverdraft ? "Ano" : "Ne"}
- Investice: ${formData.hasInvestments ? "Ano" : "Ne"}
- Předplatné: ${formData.hasSubscriptions ? "Ano" : "Ne"}
- Měsíční bilance: ${formData.monthlyBalance}

Nastavení účtu:
- Měsíční rozpočet: ${formData.monthlyBudget}
- První výpis: ${formData.firstStatementDate}
- Sledované kategorie: ${formData.expenseCategories.join(", ")}

Poznámky:
${formData.notes}
        `,
      });
      
      toast.success("Klient byl úspěšně vytvořen");
      navigate(ROUTES.CLIENTS);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Nepodařilo se vytvořit klienta");
    }
  };

  const handleCancel = () => {
    navigate(ROUTES.CLIENTS);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.occupation;
      case 2:
        return formData.shortTermGoals.length > 0 || formData.longTermGoals.length > 0;
      case 3:
        return true; // All fields are optional
      case 4:
        return formData.createFirstAccount;
      case 5:
        return true; // Notes are optional
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <Typography variant="h3\" className="text-gray-900">
              Základní informace
            </Typography>
            
            <TextField
              label="Jméno a příjmení"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            <TextField
              label="Rok narození"
              type="number"
              value={formData.birthYear}
              onChange={(e) => setFormData({ ...formData, birthYear: parseInt(e.target.value) })}
            />

            <Select
              label="Rodinný stav"
              value={formData.maritalStatus}
              onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
            >
              <option value="single">Svobodný/á</option>
              <option value="partnership">V partnerství</option>
              <option value="divorced">Rozvedený/á</option>
              <option value="widowed">Vdovec/va</option>
            </Select>

            <TextField
              label="Počet dětí"
              type="number"
              min="0"
              value={formData.children}
              onChange={(e) => setFormData({ ...formData, children: parseInt(e.target.value) })}
            />

            <Select
              label="Bydlení"
              value={formData.housing}
              onChange={(e) => setFormData({ ...formData, housing: e.target.value })}
            >
              <option value="own">Vlastní</option>
              <option value="rent">Nájem</option>
              <option value="parents">S rodiči</option>
              <option value="other">Jinak</option>
            </Select>

            <TextField
              label="Zaměstnání"
              placeholder="např. učitel, OSVČ..."
              value={formData.occupation}
              onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
              required
            />

            <Select
              label="Typ příjmu"
              value={formData.incomeType}
              onChange={(e) => setFormData({ ...formData, incomeType: e.target.value })}
            >
              <option value="stable">Stabilní</option>
              <option value="variable">Proměnlivý</option>
              <option value="irregular">Nepravidelný</option>
            </Select>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <Typography variant="h3" className="text-gray-900">
              Finanční cíle
            </Typography>

            <div className="space-y-4">
              <Typography variant="body" className="font-medium">
                Krátkodobé cíle (1-2 roky)
              </Typography>
              <div className="space-y-2">
                {[
                  ["vacation", "Dovolená"],
                  ["housing", "Nové bydlení"],
                  ["reserve", "Rezerva"],
                  ["car", "Nákup auta"],
                  ["debts", "Splacení dluhů"],
                ].map(([value, label]) => (
                  <label key={value} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.shortTermGoals.includes(value)}
                      onChange={(e) => {
                        const goals = e.target.checked
                          ? [...formData.shortTermGoals, value]
                          : formData.shortTermGoals.filter(g => g !== value);
                        setFormData({ ...formData, shortTermGoals: goals });
                      }}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">{label}</span>
                  </label>
                ))}
                {formData.shortTermGoals.includes("other") && (
                  <TextField
                    placeholder="Jiný cíl..."
                    value={formData.shortTermGoalsOther}
                    onChange={(e) => setFormData({ ...formData, shortTermGoalsOther: e.target.value })}
                    className="mt-2"
                  />
                )}
              </div>
            </div>

            <div className="space-y-4">
              <Typography variant="body" className="font-medium">
                Dlouhodobé cíle (3+ roky)
              </Typography>
              <div className="space-y-2">
                {[
                  ["independence", "Finanční nezávislost"],
                  ["children", "Spoření pro děti"],
                  ["investments", "Investice"],
                  ["own-housing", "Vlastní bydlení"],
                  ["retirement", "Důchod"],
                ].map(([value, label]) => (
                  <label key={value} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.longTermGoals.includes(value)}
                      onChange={(e) => {
                        const goals = e.target.checked
                          ? [...formData.longTermGoals, value]
                          : formData.longTermGoals.filter(g => g !== value);
                        setFormData({ ...formData, longTermGoals: goals });
                      }}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">{label}</span>
                  </label>
                ))}
                {formData.longTermGoals.includes("other") && (
                  <TextField
                    placeholder="Jiný cíl..."
                    value={formData.longTermGoalsOther}
                    onChange={(e) => setFormData({ ...formData, longTermGoalsOther: e.target.value })}
                    className="mt-2"
                  />
                )}
              </div>
            </div>

            <div className="space-y-4">
              <Typography variant="body" className="font-medium">
                Priorita
              </Typography>
              <div className="space-y-2">
                {[
                  ["save", "🟢 Spořit"],
                  ["overview", "🟡 Získat přehled"],
                  ["optimize", "🔵 Optimalizovat výdaje"],
                  ["debts", "🔴 Zbavit se závazků"],
                ].map(([value, label]) => (
                  <label key={value} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="priority"
                      value={value}
                      checked={formData.priority === value}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                      className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <Typography variant="h3" className="text-gray-900">
              Finanční chování
            </Typography>

            <Select
              label="Jak sleduje finance?"
              value={formData.trackingMethod}
              onChange={(e) => setFormData({ ...formData, trackingMethod: e.target.value })}
            >
              <option value="manual">Manuálně (Excel, papír)</option>
              <option value="app">Banking app</option>
              <option value="none">Nesleduje</option>
            </Select>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-700">Kreditní karty</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.hasCredit}
                    onChange={(e) => setFormData({ ...formData, hasCredit: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-700">Kontokorent</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.hasOverdraft}
                    onChange={(e) => setFormData({ ...formData, hasOverdraft: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-700">Aktivní investice</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.hasInvestments}
                    onChange={(e) => setFormData({ ...formData, hasInvestments: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-700">Využívá předplatná</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.hasSubscriptions}
                    onChange={(e) => setFormData({ ...formData, hasSubscriptions: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>

            <Select
              label="Měsíční přebytek"
              value={formData.monthlyBalance}
              onChange={(e) => setFormData({ ...formData, monthlyBalance: e.target.value })}
            >
              <option value="surplus">Má přebytek</option>
              <option value="zero">Je +- na nule</option>
              <option value="deficit">Má pravidelný schodek</option>
            </Select>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <Typography variant="h3" className="text-gray-900">
              Výchozí nastavení účtu
            </Typography>

            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-700">Založit první účet</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.createFirstAccount}
                  onChange={(e) => setFormData({ ...formData, createFirstAccount: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <TextField
              label="Měsíční rozpočet"
              type="number"
              placeholder="Přeskočit"
              value={formData.monthlyBudget}
              onChange={(e) => setFormData({ ...formData, monthlyBudget: e.target.value })}
            />

            <TextField
              label="První výpis k nahrání"
              type="date"
              value={formData.firstStatementDate}
              onChange={(e) => setFormData({ ...formData, firstStatementDate: e.target.value })}
            />

            <div className="space-y-4">
              <Typography variant="body" className="font-medium">
                Kategorie výdajů k hlídání
              </Typography>
              <div className="space-y-2">
                {[
                  ["food", "Jídlo"],
                  ["transport", "Doprava"],
                  ["energy", "Energie"],
                  ["entertainment", "Zábava"],
                  ["subscriptions", "Předplatná"],
                ].map(([value, label]) => (
                  <label key={value} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.expenseCategories.includes(value)}
                      onChange={(e) => {
                        const categories = e.target.checked
                          ? [...formData.expenseCategories, value]
                          : formData.expenseCategories.filter(c => c !== value);
                        setFormData({ ...formData, expenseCategories: categories });
                      }}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <Typography variant="h3" className="text-gray-900">
              Poznámky
            </Typography>

            <TextField
              label="Interní poznámky"
              multiline
              rows={4}
              placeholder="Např.: V minulosti měl finanční problémy, preferuje nízké riziko..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />

            <div className="mt-8 p-6 bg-gray-50 rounded-lg space-y-4">
              <Typography variant="h3" className="text-gray-900">
                Shrnutí
              </Typography>

              <div className="space-y-4 text-sm">
                <div>
                  <strong>Základní informace:</strong>
                  <ul className="mt-1 list-disc list-inside">
                    <li>Jméno: {formData.name}</li>
                    <li>Rok narození: {formData.birthYear}</li>
                    <li>Zaměstnání: {formData.occupation}</li>
                  </ul>
                </div>

                <div>
                  <strong>Finanční cíle:</strong>
                  <ul className="mt-1 list-disc list-inside">
                    <li>Krátkodobé: {formData.shortTermGoals.length} cílů</li>
                    <li>Dlouhodobé: {formData.longTermGoals.length} cílů</li>
                    <li>Priorita: {formData.priority}</li>
                  </ul>
                </div>

                <div>
                  <strong>Nastavení účtu:</strong>
                  <ul className="mt-1 list-disc list-inside">
                    <li>První účet: {formData.createFirstAccount ? "Ano" : "Ne"}</li>
                    <li>Sledované kategorie: {formData.expenseCategories.length}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gray-100 rounded-lg">
            <UserPlus className="w-5 h-5 text-gray-900" />
          </div>
          <Typography variant="h2" className="text-gray-900">
            Přidat klienta
          </Typography>
        </div>
        <Typography variant="small" className="text-gray-500">
          Vytvoření nového klienta
        </Typography>
      </div>

      {/* Progress Steps */}
      <div className="flex justify-between items-center">
        {[1, 2, 3, 4, 5].map((step) => (
          <div
            key={step}
            className={`flex items-center ${
              step < 5 ? "flex-1" : ""
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step <= currentStep
                  ? "bg-primary-600 text-white"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              {step}
            </div>
            {step < 5 && (
              <div
                className={`flex-1 h-1 mx-2 ${
                  step < currentStep ? "bg-primary-600" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Form Content */}
      <Paper className="p-6">
        {renderStepContent()}

        <div className="flex justify-between mt-8">
          <div>
            {currentStep > 1 && (
              <Button
                variant="secondary"
                onClick={() => setCurrentStep((prev) => (prev > 1 ? (prev - 1) as FormStep : prev))}
              >
                <ChevronLeft size={16} className="mr-2" />
                Zpět
              </Button>
            )}
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={handleCancel}>
              <X size={16} className="mr-2" />
              Zrušit
            </Button>
            {currentStep < 5 ? (
              <Button
                onClick={() => setCurrentStep((prev) => (prev < 5 ? (prev + 1) as FormStep : prev))}
                disabled={!canProceed()}
              >
                Další
                <ChevronRight size={16} className="ml-2" />
              </Button>
            ) : (
              <Button onClick={handleSave} disabled={!canProceed()}>
                <Save size={16} className="mr-2" />
                Vytvořit klienta
              </Button>
            )}
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default ClientCreate;
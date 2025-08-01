import React, { useState } from 'react';
import { Search, MessageCircle, Send, Pill, Shield, AlertTriangle, Info } from 'lucide-react';

interface MedicineInfo {
  name: string;
  use: string;
  sideEffects: string;
  precautions: string;
}

interface ChatMessage {
  id: number;
  text: string;
  isBot: boolean;
}

function App() {
  const [medicineName, setMedicineName] = useState('');
  const [medicineInfo, setMedicineInfo] = useState<MedicineInfo | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Sample medicine data
  const medicineDatabase: Record<string, MedicineInfo> = {
    paracetamol: {
      name: 'Paracetamol',
      use: 'Used to treat pain and reduce fever. Commonly used for headaches, muscle aches, arthritis, backaches, toothaches, colds, and fevers.',
      sideEffects: 'Generally well-tolerated. Rare side effects may include nausea, stomach pain, loss of appetite, and skin rash. Overdose can cause serious liver damage.',
      precautions: 'Do not exceed recommended dose. Avoid alcohol while taking this medication. Consult doctor if you have liver problems or are taking other medications containing paracetamol.'
    },
    ibuprofen: {
      name: 'Ibuprofen',
      use: 'Anti-inflammatory medication used to reduce fever, pain, and inflammation. Effective for headaches, dental pain, menstrual cramps, muscle aches, and arthritis.',
      sideEffects: 'May cause stomach upset, heartburn, dizziness, or drowsiness. Long-term use may increase risk of heart attack, stroke, or stomach bleeding.',
      precautions: 'Take with food to reduce stomach irritation. Avoid if you have heart disease, high blood pressure, or stomach ulcers. Not recommended during pregnancy.'
    },
    aspirin: {
      name: 'Aspirin',
      use: 'Used to reduce pain, fever, and inflammation. Also used in low doses to prevent heart attacks and strokes in high-risk patients.',
      sideEffects: 'Common side effects include stomach irritation, heartburn, and nausea. May increase bleeding risk and cause allergic reactions in some people.',
      precautions: 'Not suitable for children under 16 due to risk of Reye\'s syndrome. Avoid if you have bleeding disorders or are taking blood thinners.'
    }
  };

  // Sample bot responses
  const botResponses = [
    "Paracetamol is generally safe with ibuprofen when taken as directed, but avoid exceeding recommended doses of either medication.",
    "Avoid this medicine during the first trimester of pregnancy unless specifically prescribed by your healthcare provider.",
    "Always consult your doctor before combining medications, especially if you have existing health conditions.",
    "This medication should be taken with food to reduce the risk of stomach irritation.",
    "If you experience any unusual symptoms while taking this medication, contact your healthcare provider immediately.",
    "Store medications in a cool, dry place away from children and pets.",
    "Never share prescription medications with others, even if they have similar symptoms."
  ];

  const handleMedicineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!medicineName.trim()) return;

    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const searchKey = medicineName.toLowerCase().trim();
      const info = medicineDatabase[searchKey] || {
        name: medicineName,
        use: 'Information not available in our database. Please consult your healthcare provider or pharmacist for detailed information about this medication.',
        sideEffects: 'Side effects information not available. Please refer to the medication packaging or consult your healthcare provider.',
        precautions: 'Precautions information not available. Always follow the instructions provided by your healthcare provider or on the medication packaging.'
      };
      
      setMedicineInfo(info);
      setIsLoading(false);
    }, 1000);
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      text: chatInput,
      isBot: false
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: Date.now() + 1,
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        isBot: true
      };
      setChatMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-3">
            <img 
              src="/public/Screenshot 2025-08-01 211922.png" 
              alt="MIC Logo" 
              className="w-16 h-16 object-contain"
            />
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                MIC – Medicine Information Checker
              </h1>
              <p className="text-lg md:text-xl font-medium text-orange-600">
                Know Your Meds. Avoid Hospital Beds.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Medicine Search Section */}
        <section className="bg-white rounded-2xl shadow-lg p-8">
          <div className="max-w-md mx-auto">
            <form onSubmit={handleMedicineSubmit} className="space-y-6">
              <div>
                <label htmlFor="medicine" className="block text-lg font-semibold text-gray-700 mb-3">
                  Enter Medicine Name
                </label>
                <div className="relative">
                  <input
                    id="medicine"
                    type="text"
                    value={medicineName}
                    onChange={(e) => setMedicineName(e.target.value)}
                    placeholder="e.g., Paracetamol, Ibuprofen, Aspirin"
                    className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 text-lg"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl text-lg"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Searching...</span>
                  </div>
                ) : (
                  'Get Info'
                )}
              </button>
            </form>
          </div>
        </section>

        {/* Medicine Information Card */}
        {medicineInfo && (
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <Pill className="w-8 h-8 text-indigo-600" />
                <h2 className="text-2xl font-bold text-gray-800">Medicine Information</h2>
              </div>
              
              <div className="grid gap-6">
                <div className="bg-indigo-50 rounded-xl p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <Info className="w-5 h-5 text-indigo-600" />
                    <h3 className="text-lg font-semibold text-indigo-800">Medicine Name:</h3>
                  </div>
                  <p className="text-gray-700 text-lg font-medium">{medicineInfo.name}</p>
                </div>

                <div className="bg-emerald-50 rounded-xl p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <Shield className="w-5 h-5 text-emerald-600" />
                    <h3 className="text-lg font-semibold text-emerald-800">Use / Description:</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{medicineInfo.use}</p>
                </div>

                <div className="bg-orange-50 rounded-xl p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                    <h3 className="text-lg font-semibold text-orange-800">Side Effects:</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{medicineInfo.sideEffects}</p>
                </div>

                <div className="bg-red-50 rounded-xl p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <h3 className="text-lg font-semibold text-red-800">Precautions:</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{medicineInfo.precautions}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Chatbot Section */}
        <section className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center space-x-3 mb-6">
            <MessageCircle className="w-8 h-8 text-emerald-600" />
            <h2 className="text-2xl font-bold text-gray-800">Ask MedBot</h2>
          </div>

          {/* Chat Messages */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6 min-h-[300px] max-h-[400px] overflow-y-auto">
            {chatMessages.length === 0 ? (
              <div className="text-center text-gray-500 mt-20">
                <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg">Start a conversation with MedBot!</p>
                <p className="text-sm mt-2">Ask questions about medications, interactions, or general health advice.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                        message.isBot
                          ? 'bg-emerald-100 text-emerald-800 rounded-bl-sm'
                          : 'bg-indigo-600 text-white rounded-br-sm'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleChatSubmit} className="flex space-x-3">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
            />
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-slate-300 hover:text-white transition-colors duration-200">About</a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors duration-200">Contact</a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors duration-200">Terms</a>
            </div>
            <p className="text-sm text-slate-400">© 2025 MIC App</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
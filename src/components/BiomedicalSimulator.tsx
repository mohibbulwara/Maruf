import { useEffect, useRef, useState } from 'react';
import { Activity, Bell, BellOff, Volume2, VolumeX, ShieldAlert, CheckCircle2, Play, Pause } from 'lucide-react';

type RhythmType = 'NSR' | 'Tachycardia' | 'Bradycardia' | 'VFib' | 'Asystole' | 'PVC';

export default function BiomedicalSimulator() {
  const [rhythm, setRhythm] = useState<RhythmType>('NSR');
  const [bpm, setBpm] = useState<number>(75);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isAlarmsMuted, setIsAlarmsMuted] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [alarmActive, setAlarmActive] = useState<boolean>(false);
  const [alarmMessage, setAlarmMessage] = useState<string>('');
  
  const ecgCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const spo2CanvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Parameter readouts with slight random variations for organic realism
  const [hr, setHr] = useState<number>(75);
  const [spo2, setSpo2] = useState<number>(98);
  const [rr, setRr] = useState<number>(16);
  const [temp, setTemp] = useState<number>(36.8);

  // Set BPM based on rhythm selection
  useEffect(() => {
    if (rhythm === 'NSR') {
      setBpm(75);
      setSpo2(Math.floor(Math.random() * 2) + 98); // 98-99
      setRr(Math.floor(Math.random() * 3) + 14); // 14-16
      setAlarmActive(false);
    } else if (rhythm === 'Tachycardia') {
      setBpm(135);
      setSpo2(Math.floor(Math.random() * 3) + 95); // 95-97
      setRr(Math.floor(Math.random() * 4) + 20); // 20-23
      setAlarmActive(true);
      setAlarmMessage('TACHYCARDIA ALERT - HR > 120');
    } else if (rhythm === 'Bradycardia') {
      setBpm(45);
      setSpo2(Math.floor(Math.random() * 2) + 97);
      setRr(Math.floor(Math.random() * 3) + 10); // 10-12
      setAlarmActive(true);
      setAlarmMessage('BRADYCARDIA ALERT - HR < 50');
    } else if (rhythm === 'VFib') {
      setBpm(190);
      setSpo2(72); // Dramatic desaturation
      setRr(8);
      setAlarmActive(true);
      setAlarmMessage('CRITICAL: VENTRICULAR FIBRILLATION');
    } else if (rhythm === 'Asystole') {
      setBpm(0);
      setSpo2(0);
      setRr(0);
      setAlarmActive(true);
      setAlarmMessage('APNEA / ASYSTOLE - PATIENT COLD');
    } else if (rhythm === 'PVC') {
      setBpm(72);
      setSpo2(97);
      setRr(15);
      setAlarmActive(false);
    }
  }, [rhythm]);

  // Handle minor parameter drifts for realistic medical display feel
  useEffect(() => {
    if (!isPlaying || rhythm === 'Asystole') return;
    
    const interval = setInterval(() => {
      // Small fluctuations
      setHr(prev => {
        if (rhythm === 'Asystole') return 0;
        if (rhythm === 'VFib') return Math.floor(Math.random() * 30) + 180;
        const drift = (Math.random() - 0.5) * 2;
        const target = bpm;
        return Math.max(30, Math.min(220, Math.round(prev + drift * 0.5 + (target - prev) * 0.1)));
      });

      setSpo2(prev => {
        if (rhythm === 'Asystole') return 0;
        if (rhythm === 'VFib') return Math.max(50, prev - 1);
        const baseline = rhythm === 'Tachycardia' ? 95 : 98;
        const drift = Math.random() > 0.8 ? (Math.random() - 0.5) * 2 : 0;
        return Math.max(60, Math.min(100, Math.round(prev + drift + (baseline - prev) * 0.05)));
      });

      setRr(prev => {
        if (rhythm === 'Asystole') return 0;
        if (rhythm === 'VFib') return Math.max(4, prev - 0.5);
        const baseline = rhythm === 'Tachycardia' ? 22 : rhythm === 'Bradycardia' ? 11 : 15;
        const drift = (Math.random() - 0.5) * 0.5;
        return Math.max(0, Math.min(40, Math.round(prev + drift + (baseline - prev) * 0.05)));
      });

      setTemp(prev => {
        const drift = (Math.random() - 0.5) * 0.1;
        const baseline = rhythm === 'VFib' ? 35.8 : 36.8;
        return Math.max(34, Math.min(42, Math.round((prev + drift + (baseline - prev) * 0.02) * 10) / 10));
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [bpm, rhythm, isPlaying]);

  // Audio Beep Trigger
  const triggerAudioBeep = (freq = 800, dur = 0.06) => {
    if (isMuted) return;
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.value = freq;
      
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + dur);
    } catch (e) {
      console.warn('Audio Beep failed to trigger', e);
    }
  };

  // Sweep scan render loop
  useEffect(() => {
    const ecgCanvas = ecgCanvasRef.current;
    const spo2Canvas = spo2CanvasRef.current;
    if (!ecgCanvas || !spo2Canvas) return;

    const ecgCtx = ecgCanvas.getContext('2d', { alpha: false });
    const spo2Ctx = spo2Canvas.getContext('2d', { alpha: false });
    if (!ecgCtx || !spo2Ctx) return;

    // Set canvas sizes based on bounding rectangle for high resolution
    const resizeCanvas = () => {
      const rect = ecgCanvas.parentElement?.getBoundingClientRect();
      if (rect) {
        ecgCanvas.width = rect.width;
        ecgCanvas.height = 140;
        spo2Canvas.width = rect.width;
        spo2Canvas.height = 100;
        
        // Initial black fill
        ecgCtx.fillStyle = '#000000';
        ecgCtx.fillRect(0, 0, ecgCanvas.width, ecgCanvas.height);
        spo2Ctx.fillStyle = '#000000';
        spo2Ctx.fillRect(0, 0, spo2Canvas.width, spo2Canvas.height);
      }
    };
    resizeCanvas();
    
    // Variables for the sweep-bar drawing
    let sweepX = 0;
    const sweepStep = 2.5; // horizontal resolution
    const sweepGap = 28;  // width of erase bar ahead
    
    // Track previous points to connect lines
    let prevEcgY = 70;
    let prevSpo2Y = 50;
    
    // Beat states to prevent multi-beep
    let lastBeatTime = 0;
    let didBeepThisBeat = false;

    // Simulation running clock
    let clock = 0;

    // Redraw loop
    const render = () => {
      if (!isPlaying) {
        animationFrameRef.current = requestAnimationFrame(render);
        return;
      }

      const w = ecgCanvas.width;
      const hEcg = ecgCanvas.height;
      const hSpo2 = spo2Canvas.height;

      // Erase a bar just ahead of our sweep position
      ecgCtx.fillStyle = '#FCFAF5';
      ecgCtx.fillRect(sweepX, 0, sweepGap, hEcg);
      spo2Ctx.fillStyle = '#FCFAF5';
      spo2Ctx.fillRect(sweepX, 0, sweepGap, hSpo2);

      // Redraw subtle grid background inside the erase gap area
      const drawGridStrip = (ctx: CanvasRenderingContext2D, startX: number, width: number, height: number) => {
        ctx.strokeStyle = 'rgba(139, 30, 63, 0.07)'; // Burgundy grid
        ctx.lineWidth = 0.5;
        
        // Vertical lines
        const gridSpacing = 15;
        const firstLine = Math.ceil(startX / gridSpacing) * gridSpacing;
        for (let x = firstLine; x < startX + width; x += gridSpacing) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }

        // Horizontal lines
        const firstHLine = 0;
        for (let y = firstHLine; y < height; y += gridSpacing) {
          ctx.beginPath();
          ctx.moveTo(startX, y);
          ctx.lineTo(startX + width, y);
          ctx.stroke();
        }
      };

      drawGridStrip(ecgCtx, sweepX, sweepGap, hEcg);
      drawGridStrip(spo2Ctx, sweepX, sweepGap, hSpo2);

      // Current clinical time in seconds
      const t = clock / 60; // 60 fps simulation
      clock += 1.3 * (bpm / 75); // Speed clock up or down based on BPM

      // Generate ECG and SpO2 amplitudes
      let ecgAmp = 0;
      let spo2Amp = 0;

      // Rate in cycles per second
      const bps = bpm / 60;
      const period = bps > 0 ? 1 / bps : 999999;
      const phase = (t % period) / period;

      // Sound trigger logic on R-wave peak
      if (rhythm !== 'Asystole' && rhythm !== 'VFib') {
        // R-peak occurs around phase 0.18-0.22
        if (phase >= 0.18 && phase <= 0.22) {
          if (!didBeepThisBeat) {
            triggerAudioBeep(800, 0.07);
            didBeepThisBeat = true;
          }
        } else {
          if (phase > 0.3) {
            didBeepThisBeat = false; // Reset for next beat
          }
        }
      }

      // 1. ECG WAVEFORM GENERATION
      if (rhythm === 'Asystole') {
        // Just flatline with minute thermal noise
        ecgAmp = (Math.random() - 0.5) * 0.03;
      } else if (rhythm === 'VFib') {
        // Ventricular Fibrillation - rapid chaotic oscillations
        ecgAmp = 
          0.30 * Math.sin(t * 18) + 
          0.25 * Math.sin(t * 31) + 
          0.15 * Math.sin(t * 43) + 
          (Math.random() - 0.5) * 0.15;
        
        // Randomly beep in V-Fib as erratic trigger
        if (Math.random() > 0.982) {
          triggerAudioBeep(650, 0.05);
        }
      } else {
        // Standard ECG cardiac components
        // P-Wave, QRS, T-Wave
        if (phase >= 0.02 && phase < 0.10) {
          // P Wave (Atrial depolarization)
          const pPhase = (phase - 0.02) / 0.08;
          ecgAmp = 0.12 * Math.sin(pPhase * Math.PI);
        } else if (phase >= 0.15 && phase < 0.17) {
          // Q wave (septal depolarization)
          const qPhase = (phase - 0.15) / 0.02;
          ecgAmp = -0.15 * Math.sin(qPhase * Math.PI);
        } else if (phase >= 0.17 && phase < 0.21) {
          // R wave (Ventricular depolarization main spike)
          const rPhase = (phase - 0.17) / 0.04;
          ecgAmp = 1.1 * Math.sin(rPhase * Math.PI);
        } else if (phase >= 0.21 && phase < 0.23) {
          // S wave (basal ventricular depolarization)
          const sPhase = (phase - 0.21) / 0.02;
          ecgAmp = -0.32 * Math.sin(sPhase * Math.PI);
        } else if (phase >= 0.32 && phase < 0.46) {
          // T Wave (Ventricular repolarization)
          const tPhase = (phase - 0.32) / 0.14;
          ecgAmp = 0.25 * Math.sin(tPhase * Math.PI);
        } else if (rhythm === 'PVC' && phase >= 0.55 && phase < 0.70) {
          // Premature Ventricular Contraction - added abnormal wide complex
          const pvcPhase = (phase - 0.55) / 0.15;
          ecgAmp = -0.6 * Math.sin(pvcPhase * Math.PI * 1.5) + 0.3 * Math.sin(pvcPhase * Math.PI * 3);
        } else {
          ecgAmp = 0;
        }

        // Add typical grid baseline noise
        ecgAmp += (Math.random() - 0.5) * 0.015;
      }

      // Map ECG amplitude to canvas vertical coordinates
      const ecgBaseline = hEcg / 2 + 10;
      const ecgY = ecgBaseline - (ecgAmp * 45);

      // 2. SPO2 WAVEFORM GENERATION (Plethysmogram Pulse)
      if (rhythm === 'Asystole') {
        spo2Amp = (Math.random() - 0.5) * 0.02;
      } else if (rhythm === 'VFib') {
        spo2Amp = 0.06 * Math.sin(t * 15) + (Math.random() - 0.5) * 0.04;
      } else {
        // Synchronized pulsatile pleth wave
        // Rapid systolic rise, slower diastolic fall with dicrotic notch
        const spo2Phase = (phase + 0.95) % 1.0; // Phase shift relative to ECG
        if (spo2Phase >= 0.15 && spo2Phase < 0.32) {
          // Systolic rise
          const rPhase = (spo2Phase - 0.15) / 0.17;
          spo2Amp = 0.85 * Math.sin(rPhase * Math.PI / 2);
        } else if (spo2Phase >= 0.32 && spo2Phase < 0.42) {
          // Dicrotic notch dip
          const dPhase = (spo2Phase - 0.32) / 0.10;
          spo2Amp = 0.85 - 0.25 * Math.sin(dPhase * Math.PI);
        } else if (spo2Phase >= 0.42 && spo2Phase < 0.48) {
          // Secondary dicrotic peak
          const sPhase = (spo2Phase - 0.42) / 0.06;
          spo2Amp = 0.60 + 0.08 * Math.sin(sPhase * Math.PI);
        } else if (spo2Phase >= 0.48) {
          // Diastolic decay
          const decayPhase = (spo2Phase - 0.48) / 0.52;
          spo2Amp = 0.68 * Math.exp(-2.2 * decayPhase);
        } else {
          // Rest gap
          const fillPhase = spo2Phase / 0.15;
          spo2Amp = 0.1 + 0.15 * Math.exp(-1.5 * fillPhase);
        }
        
        // Add minimal pulse wave noise
        spo2Amp += (Math.random() - 0.5) * 0.01;
      }

      const spo2Baseline = hSpo2 - 25;
      const spo2Y = spo2Baseline - (spo2Amp * 50);

      // 3. DRAW TO CANVASES
      // Draw ECG line segments
      ecgCtx.strokeStyle = rhythm === 'VFib' || rhythm === 'Asystole' ? '#DC2626' : '#0284C7'; // Dynamic Warning Red or Surgical Blue
      ecgCtx.lineWidth = 2.0;
      ecgCtx.lineCap = 'round';
      ecgCtx.shadowColor = rhythm === 'VFib' || rhythm === 'Asystole' ? '#DC2626' : '#0284C7';
      ecgCtx.shadowBlur = 0; // Disable neon glow for classical print look
      
      ecgCtx.beginPath();
      // Avoid connecting wrapping lines from right edge back to left edge
      if (sweepX > 0) {
        ecgCtx.moveTo(sweepX - sweepStep, prevEcgY);
        ecgCtx.lineTo(sweepX, ecgY);
      } else {
        ecgCtx.moveTo(0, ecgY);
        ecgCtx.lineTo(sweepX, ecgY);
      }
      ecgCtx.stroke();

      // Draw SpO2 line segments
      spo2Ctx.strokeStyle = '#0D9488'; // Clean Teal
      spo2Ctx.lineWidth = 2.0;
      spo2Ctx.lineCap = 'round';
      spo2Ctx.shadowColor = '#0D9488';
      spo2Ctx.shadowBlur = 0; // Disable neon glow for classical print look

      spo2Ctx.beginPath();
      if (sweepX > 0) {
        spo2Ctx.moveTo(sweepX - sweepStep, prevSpo2Y);
        spo2Ctx.lineTo(sweepX, spo2Y);
      } else {
        spo2Ctx.moveTo(0, spo2Y);
        spo2Ctx.lineTo(sweepX, spo2Y);
      }
      spo2Ctx.stroke();

      // Reset shadows for next operations
      ecgCtx.shadowBlur = 0;
      spo2Ctx.shadowBlur = 0;

      // Draw a highly visible bright sweep sweep cursor (the scan line)
      ecgCtx.fillStyle = '#0284C7';
      ecgCtx.fillRect(sweepX, 0, 2, hEcg);
      spo2Ctx.fillStyle = '#0D9488';
      spo2Ctx.fillRect(sweepX, 0, 2, hSpo2);

      // Update trackers
      prevEcgY = ecgY;
      prevSpo2Y = spo2Y;

      // Move sweep bar
      sweepX += sweepStep;
      if (sweepX >= w) {
        sweepX = 0;
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [bpm, rhythm, isPlaying, isMuted]);

  return (
    <div id="biomedical-simulator" className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-md relative overflow-hidden font-sans">
      {/* Absolute monitor grid backdrop effect */}
      <div className="absolute inset-0 bg-monitor-grid opacity-10 pointer-events-none" />
      
      {/* Header Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between border-b border-[#E2E8F0] pb-4 mb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-[#0284C7] animate-ping' : 'bg-[#0284C7]/80'} absolute`} />
            <div className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-[#0284C7]' : 'bg-[#0284C7]/40'} relative`} />
          </div>
          <div>
            <h3 className="text-stone-800 font-serif font-medium text-lg tracking-tight flex items-center gap-2">
              <Activity className="text-[#0284C7] w-5 h-5" />
              Biomedical Patient Monitor Simulator
            </h3>
            <p className="text-xs text-stone-500 font-mono">MODEL: MRF-3000-BIO | SWEEP-SCAN V1.4</p>
          </div>
        </div>

        {/* Audio controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-2 rounded-lg transition-colors border cursor-pointer ${
              isMuted 
                ? 'bg-stone-50 border-[#E2E8F0] text-stone-400 hover:text-stone-600' 
                : 'bg-[#0284C7]/10 border-[#0284C7]/30 text-[#0284C7] hover:bg-[#0284C7]/20'
            }`}
            title={isMuted ? 'Unmute cardiac beep' : 'Mute cardiac beep'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`p-2 rounded-lg transition-colors border cursor-pointer ${
              isPlaying 
                ? 'bg-stone-50 border-[#E2E8F0] text-stone-600 hover:bg-stone-100' 
                : 'bg-[#0F172A] border-transparent text-white hover:bg-slate-800'
            }`}
            title={isPlaying ? 'Pause sweep' : 'Resume sweep'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Grid: Waveform Screen & Numeric Readouts */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Side: Real-time Waveforms */}
        <div className="lg:col-span-3 flex flex-col gap-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4">
          
          {/* ECG Channel */}
          <div>
            <div className="flex justify-between items-center px-1 mb-1">
              <span className="text-xs font-mono font-bold tracking-widest text-[#0284C7]">ECG - Lead II (mV)</span>
              <span className="text-[10px] font-mono text-stone-400">x1.0 | 25mm/s</span>
            </div>
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg overflow-hidden h-[140px] relative">
              <canvas ref={ecgCanvasRef} className="w-full h-full block" />
            </div>
          </div>

          {/* SpO2 Channel */}
          <div>
            <div className="flex justify-between items-center px-1 mb-1">
              <span className="text-xs font-mono font-bold tracking-widest text-[#0D9488]">SpO2 Pleth Pulse</span>
              <span className="text-[10px] font-mono text-stone-400">x2.0</span>
            </div>
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg overflow-hidden h-[100px] relative">
              <canvas ref={spo2CanvasRef} className="w-full h-full block" />
            </div>
          </div>
          
        </div>

        {/* Right Side: Vital Metrics Displays */}
        <div className="flex flex-col gap-3">
          
          {/* Heart Rate Display (HR) */}
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 flex justify-between items-center relative overflow-hidden shadow-sm">
            <div className="absolute right-2 -bottom-2 text-[#0284C7]/5 select-none font-mono font-bold text-6xl">HR</div>
            <div>
              <p className="text-[10px] font-mono font-bold tracking-widest text-[#0284C7]">HR (ECG)</p>
              <p className="text-xs text-stone-400 font-mono">BPM</p>
              <p className="text-xs font-mono text-stone-400 mt-2">Norm: 60-100</p>
            </div>
            <div className="text-right">
              <p className={`text-5xl font-mono font-semibold tracking-tighter ${
                hr === 0 ? 'text-red-600 animate-pulse' :
                hr > 120 || hr < 50 ? 'text-red-500 font-bold animate-pulse' : 'text-[#0284C7]'
              }`}>
                {hr === 0 ? '---' : hr}
              </p>
              {hr > 0 && (
                <span className={`inline-block text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded ${
                  hr > 120 || hr < 50 ? 'bg-red-50 text-red-800 border border-red-100' : 'bg-[#0284C7]/5 text-[#0284C7] border border-[#0284C7]/20'
                }`}>
                  {hr > 120 ? 'HI ALERT' : hr < 50 ? 'LO ALERT' : 'STABLE'}
                </span>
              )}
            </div>
          </div>

          {/* Oxygen Saturation (SpO2) */}
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 flex justify-between items-center relative overflow-hidden shadow-sm">
            <div className="absolute right-2 -bottom-2 text-[#0D9488]/5 select-none font-mono font-bold text-6xl">O2</div>
            <div>
              <p className="text-[10px] font-mono font-bold tracking-widest text-[#0D9488]">SpO2 (PULSE)</p>
              <p className="text-xs text-stone-400 font-mono">% O₂ Sat</p>
              <p className="text-xs font-mono text-stone-400 mt-2">Norm: 95-100</p>
            </div>
            <div className="text-right">
              <p className={`text-5xl font-mono font-semibold tracking-tighter ${
                spo2 === 0 ? 'text-red-600 animate-pulse' :
                spo2 < 93 ? 'text-red-500 animate-pulse' : 'text-[#0D9488]'
              }`}>
                {spo2 === 0 ? '---' : spo2}
              </p>
              {spo2 > 0 && (
                <span className={`inline-block text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded ${
                  spo2 < 93 ? 'bg-red-50 text-red-800 border border-red-100' : 'bg-[#0D9488]/10 text-[#0D9488] border border-[#0D9488]/20'
                }`}>
                  {spo2 < 93 ? 'DESAT' : 'OPTIMAL'}
                </span>
              )}
            </div>
          </div>

          {/* Respiration & Temp Dual row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3 flex flex-col justify-between shadow-sm">
              <div>
                <p className="text-[9px] font-mono font-bold tracking-widest text-[#0D9488]">RESP (IMP)</p>
                <p className="text-[10px] text-stone-400 font-mono">Breaths/min</p>
              </div>
              <div className="text-right mt-2">
                <p className="text-2xl font-mono font-bold text-[#0D9488]">
                  {rr === 0 ? '---' : rr}
                </p>
              </div>
            </div>

            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3 flex flex-col justify-between shadow-sm">
              <div>
                <p className="text-[9px] font-mono font-bold tracking-widest text-[#0284C7]">TEMP (T1)</p>
                <p className="text-[10px] text-stone-400 font-mono">°C Oral</p>
              </div>
              <div className="text-right mt-2">
                <p className="text-2xl font-mono font-bold text-[#0284C7]">
                  {temp === 0 ? '---' : temp.toFixed(1)}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Alarm Banner */}
      {alarmActive && (
        <div className="relative z-10 mt-5 bg-red-50 border border-red-100 rounded-xl p-3 animate-pulse flex items-center gap-3">
          <ShieldAlert className="text-red-700 w-5 h-5 shrink-0" />
          <div className="flex-1">
            <span className="text-xs font-bold font-mono text-red-800 tracking-wider">SYSTEM PATIENT STATUS DISPATCH:</span>
            <p className="text-sm font-sans font-bold text-red-950">{alarmMessage}</p>
          </div>
          <span className="text-[10px] font-mono font-bold bg-red-600 text-white px-2 py-0.5 rounded">
            CRITICAL
          </span>
        </div>
      )}

      {/* Simulator Control Board */}
      <div className="relative z-10 mt-6 border-t border-[#E2E8F0] pt-5">
        <h4 className="text-xs font-bold font-mono tracking-widest text-slate-500 mb-3">ELECTRO-MEDICAL RHYTHM SIMULATOR CORE</h4>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'NSR', label: 'Normal Sinus' },
            { id: 'Tachycardia', label: 'Tachycardia' },
            { id: 'Bradycardia', label: 'Bradycardia' },
            { id: 'VFib', label: 'V-Fib (Arrest)' },
            { id: 'Asystole', label: 'Asystole (Flatline)' },
            { id: 'PVC', label: 'PVC (Arrhythmia)' },
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => setRhythm(btn.id as RhythmType)}
              className={`text-xs px-3 py-2 rounded-lg font-medium transition-all border cursor-pointer ${
                rhythm === btn.id
                  ? 'bg-[#0284C7] text-white border-transparent font-semibold shadow-sm'
                  : 'bg-white border border-[#E2E8F0] text-stone-600 hover:bg-stone-50 hover:text-[#0284C7]'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Technical annotation */}
        <div className="mt-4 bg-[#F8FAFC] rounded-lg p-3 text-xs text-stone-600 flex items-start gap-2 border border-[#E2E8F0]">
          <CheckCircle2 className="text-[#0284C7] w-4 h-4 shrink-0 mt-0.5" />
          <p className="font-sans leading-relaxed">
            <strong className="text-[#0284C7]">Biomedical Engineering Insights:</strong> High-precision physiological amplifiers filter out 50Hz mains hum (notch filtering) and utilize differential baseline restoration. In his 3-month industrial training at <strong className="text-[#0284C7]">Rangpur Medical College Hospital</strong>, Maruf worked heavily with calibration of patient monitoring transducers and safety testing of clinical diagnostic systems.
          </p>
        </div>
      </div>
    </div>
  );
}

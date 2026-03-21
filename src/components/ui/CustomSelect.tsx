'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

interface CustomSelectProps {
  value: string
  onChange: (value: string) => void
  options: string[]
  placeholder: string
  className?: string
}

export function CustomSelect({
  value,
  onChange,
  options,
  placeholder,
  className = '',
}: CustomSelectProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex items-center justify-between w-full text-left ${className} ${
          value ? 'text-ink' : 'text-ink/40'
        }`}
      >
        <span>{value || placeholder}</span>
        <ChevronDown
          className={`w-4 h-4 text-[--text-secondary] shrink-0 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <ul className="absolute z-50 mt-2 w-full bg-[#ECEBE8] border border-warm/50 rounded-2xl shadow-md overflow-hidden py-1.5">
          {options.map((opt) => (
            <li
              key={opt}
              onClick={() => {
                onChange(opt)
                setOpen(false)
              }}
              className={`px-4 py-2.5 font-sans text-sm cursor-pointer transition-colors duration-150 rounded-xl mx-1.5 ${
                value === opt
                  ? 'bg-blue-soft/30 text-ink font-medium'
                  : 'text-ink hover:bg-warm/40'
              }`}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

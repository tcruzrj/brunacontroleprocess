import { supabase } from '@/lib/supabase'

export interface Process {
  protocol: string
  name: string
  responsible: string
  entryDate: string
  deadline: string
  status: string
  observations: string
}

export const processService = {
  async getAll() {
    const { data, error } = await supabase
      .from('processes')
      .select('*')
      .order('entryDate', { ascending: false })

    if (error) throw error
    return data as Process[]
  },

  async getByProtocol(protocol: string) {
    const { data, error } = await supabase
      .from('processes')
      .select('*')
      .eq('protocol', protocol)
      .single()

    if (error) throw error
    return data as Process
  },

  async create(process: Omit<Process, 'protocol'>) {
    const protocol = new Date().getTime().toString() // Gera um protocolo único baseado no timestamp
    const { data, error } = await supabase
      .from('processes')
      .insert([{ ...process, protocol }])
      .select()
      .single()

    if (error) throw error
    return data as Process
  },

  async update(protocol: string, process: Partial<Process>) {
    const { data, error } = await supabase
      .from('processes')
      .update(process)
      .eq('protocol', protocol)
      .select()
      .single()

    if (error) throw error
    return data as Process
  },

  async delete(protocol: string) {
    const { error } = await supabase
      .from('processes')
      .delete()
      .eq('protocol', protocol)

    if (error) throw error
  },

  async saveProcess(process: Process) {
    const { data, error } = await supabase
      .from('processes')
      .insert([process])

    if (error) {
      console.error('Error saving process:', error)
      throw error
    }

    return data
  }
}
